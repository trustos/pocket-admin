package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"pocket-admin/ui"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
	"github.com/pocketbase/pocketbase/plugins/ghupdate"
	"github.com/pocketbase/pocketbase/plugins/jsvm"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/pocketbase/pocketbase/tools/types"
)

const pocketAdminPath = "/admin/"

func indexFallbackMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		err := next(c)
		if err != nil {
			// Check if the error is a "not found" error
			he, ok := err.(*echo.HTTPError)
			if ok && he.Code == http.StatusNotFound {
				// Serve the SvelteKit app index.html file
				return c.File("ui/dist/index.html")
			}
		}
		return err
	}
}

func bindStaticAdminUI(e *core.ServeEvent) error {
	// redirect to trailing slash to ensure that relative urls will still work properly
	e.Router.GET(
		strings.TrimRight(pocketAdminPath, "/"),
		func(c echo.Context) error {
			return c.Redirect(http.StatusTemporaryRedirect, strings.TrimLeft(pocketAdminPath, "/"))
		},
	)

	// serves static files from the /ui/dist directory
	e.Router.GET(
		pocketAdminPath+"*",
		echo.StaticDirectoryHandler(ui.DistDirFS, false),
		middleware.Gzip(),
	)

	return nil
}

func createAdminCollectionsView(app core.App) error {
	collection := &models.Collection{}
	collection.MarkAsNew()
	collection.Id = "admin_collections"
	collection.Name = "admin_collections"
	collection.Type = models.CollectionTypeView
	collection.ListRule = types.Pointer("")
	collection.ViewRule = types.Pointer("")

	collection.SetOptions(models.CollectionViewOptions{
		Query: `
	SELECT id, name, type, schema, listRule, viewRule, createRule, updateRule, deleteRule
	FROM _collections
	WHERE type = 'base'
	UNION ALL
	SELECT id, name, 'view' AS type, schema,
    NULL AS listRule,
    NULL AS viewRule,
    NULL AS createRule,
    NULL AS updateRule,
    NULL AS deleteRule
	FROM _collections
	WHERE name = 'admin_collections'`,
	})

	return app.Dao().SaveCollection(collection)
}

func createAdminRolesCollection(app core.App) error {
	collection := &models.Collection{}
	collection.MarkAsNew()
	collection.Id = "admin_roles"
	collection.Name = "admin_roles"
	collection.Type = models.CollectionTypeBase
	collection.ListRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.ViewRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.CreateRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.UpdateRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.DeleteRule = types.Pointer("@request.auth.role.name = 'admin'")

	// Define the schema for the roles collection
	collection.Schema = schema.NewSchema(
		&schema.SchemaField{
			Name:     "name",
			Type:     schema.FieldTypeText,
			Required: true,
			Unique:   true,
		},
	)

	err := app.Dao().SaveCollection(collection)
	if err != nil {
		return err
	}

	// Add predefined roles
	roles := []string{"admin", "editor", "viewer"}
	for _, role := range roles {
		record := models.NewRecord(collection)
		record.Set("name", role)
		if err := app.Dao().SaveRecord(record); err != nil {
			return err
		}
	}

	return nil
}

func updateUsersCollection(app core.App) error {
	usersCollection, err := app.Dao().FindCollectionByNameOrId("users")
	if err != nil {
		return err
	}

	// Check if the role field already exists
	if usersCollection.Schema.GetFieldByName("role") == nil {
		// Add the role field to the users collection schema
		roleField := &schema.SchemaField{
			Name:     "role",
			Type:     schema.FieldTypeRelation,
			Required: true,
			Options: &schema.RelationOptions{
				MaxSelect:     types.Pointer(1),
				CollectionId:  "admin_roles",
				CascadeDelete: false,
			},
		}

		usersCollection.Schema.AddField(roleField)

		// Save the updated users collection
		if err := app.Dao().SaveCollection(usersCollection); err != nil {
			return err
		}
	}

	return nil
}

func createDefaultAdminUser(app core.App) error {
	usersCollection, err := app.Dao().FindCollectionByNameOrId("users")
	if err != nil {
		return fmt.Errorf("failed to find users collection: %v", err)
	}

	rolesCollection, err := app.Dao().FindCollectionByNameOrId("admin_roles")
	if err != nil {
		return fmt.Errorf("failed to find roles collection: %v", err)
	}

	// Check if the default admin user already exists
	existingUser, _ := app.Dao().FindAuthRecordByEmail("users", "default@admin.pa")
	if existingUser != nil {
		log.Println("Default admin user already exists, skipping creation")
		return nil
	}

	// Find the admin role
	adminRole, err := app.Dao().FindFirstRecordByData(rolesCollection.Id, "name", "admin")
	if err != nil {
		return fmt.Errorf("admin role not found: %v", err)
	}

	// Use a fixed initial password
	initialPassword := "default@admin.pa"

	// Create the default admin user
	user := models.NewRecord(usersCollection)
	user.Set("email", "default@admin.pa")
	user.Set("username", "defaultadmin")
	user.Set("role", adminRole.Id)
	user.Set("verified", true)

	// Set the password using the correct method for auth records
	if err := user.SetPassword(initialPassword); err != nil {
		return fmt.Errorf("failed to set password for default admin user: %v", err)
	}

	// Save the auth record
	if err := app.Dao().SaveRecord(user); err != nil {
		return fmt.Errorf("failed to create default admin user: %v", err)
	}

	log.Println("Default admin user created successfully and verified")
	log.Printf("Default admin email: default@admin.pa")
	log.Printf("Default admin password: %s", initialPassword)
	log.Println("IMPORTANT: Please change this password immediately after your first login!")

	return nil
}

func setupCollections(app core.App) error {
	// Check if admin_collections view exists
	_, err := app.Dao().FindCollectionByNameOrId("admin_collections")
	if err != nil {
		if err := createAdminCollectionsView(app); err != nil {
			return err
		}
	}

	// Check if roles collection exists
	_, err = app.Dao().FindCollectionByNameOrId("roles")
	if err != nil {
		if err := createAdminRolesCollection(app); err != nil {
			return err
		}
	}

	// Update users collection to include role field
	if err := updateUsersCollection(app); err != nil {
		return err
	}

	// Create default admin user
	if err := createDefaultAdminUser(app); err != nil {
		return err
	}

	// Add more collection creations here if needed

	return nil
}

func main() {
	app := pocketbase.New()

	// ---------------------------------------------------------------
	// Optional plugin flags:
	// ---------------------------------------------------------------

	var hooksDir string
	app.RootCmd.PersistentFlags().StringVar(
		&hooksDir,
		"hooksDir",
		"",
		"the directory with the JS app hooks",
	)

	var hooksWatch bool
	app.RootCmd.PersistentFlags().BoolVar(
		&hooksWatch,
		"hooksWatch",
		true,
		"auto restart the app on pb_hooks file change",
	)

	var hooksPool int
	app.RootCmd.PersistentFlags().IntVar(
		&hooksPool,
		"hooksPool",
		25,
		"the total prewarm goja.Runtime instances for the JS app hooks execution",
	)

	var migrationsDir string
	app.RootCmd.PersistentFlags().StringVar(
		&migrationsDir,
		"migrationsDir",
		"",
		"the directory with the user defined migrations",
	)

	var automigrate bool
	app.RootCmd.PersistentFlags().BoolVar(
		&automigrate,
		"automigrate",
		true,
		"enable/disable auto migrations",
	)

	var publicDir string
	app.RootCmd.PersistentFlags().StringVar(
		&publicDir,
		"publicDir",
		defaultPublicDir(),
		"the directory to serve static files",
	)

	var indexFallback bool
	app.RootCmd.PersistentFlags().BoolVar(
		&indexFallback,
		"indexFallback",
		true,
		"fallback the request to index.html on missing static path (eg. when pretty urls are used with SPA)",
	)

	var queryTimeout int
	app.RootCmd.PersistentFlags().IntVar(
		&queryTimeout,
		"queryTimeout",
		30,
		"the default SELECT queries timeout in seconds",
	)

	app.RootCmd.ParseFlags(os.Args[1:])

	// ---------------------------------------------------------------
	// Plugins and hooks:
	// ---------------------------------------------------------------

	// load jsvm (hooks and migrations)
	jsvm.MustRegister(app, jsvm.Config{
		MigrationsDir: migrationsDir,
		HooksDir:      hooksDir,
		HooksWatch:    hooksWatch,
		HooksPoolSize: hooksPool,
	})

	// migrate command (with js templates)
	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		TemplateLang: migratecmd.TemplateLangJS,
		Automigrate:  automigrate,
		Dir:          migrationsDir,
	})

	// GitHub selfupdate
	ghupdate.MustRegister(app, app.RootCmd, ghupdate.Config{})

	app.OnAfterBootstrap().PreAdd(func(e *core.BootstrapEvent) error {
		app.Dao().ModelQueryTimeout = time.Duration(queryTimeout) * time.Second
		return nil
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		bindStaticAdminUI(e)
		// serves static files from the provided public dir (if exists)
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS(publicDir), indexFallback))

		// Add the index fallback middleware
		e.Router.Use(indexFallbackMiddleware)

		return nil
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		if err := setupCollections(app); err != nil {
			return err
		}

		bindStaticAdminUI(e)

		return nil
	})

	//
	app.OnModelBeforeCreate().Add(func(e *core.ModelEvent) error {
		if collection, ok := e.Model.(*models.Collection); ok {
			if collection.Type == models.CollectionTypeBase && collection.Name != "users" && collection.Name != "admin_roles" {
				collection.ListRule = types.Pointer("@request.auth.role.name = 'admin'")
				collection.ViewRule = types.Pointer("@request.auth.role.name = 'admin'")
				collection.CreateRule = types.Pointer("@request.auth.role.name = 'admin'")
				collection.UpdateRule = types.Pointer("@request.auth.role.name = 'admin'")
				collection.DeleteRule = types.Pointer("@request.auth.role.name = 'admin'")
			}
		}
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

// the default pb_public dir location is relative to the executable
func defaultPublicDir() string {
	if strings.HasPrefix(os.Args[0], os.TempDir()) {
		// most likely ran with go run
		return "./pb_public"
	}

	return filepath.Join(os.Args[0], "../pb_public")
}
