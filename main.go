package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"pocket-admin/ui"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"github.com/pocketbase/dbx"
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
			he, ok := err.(*echo.HTTPError)
			if ok && he.Code == http.StatusNotFound {
				return c.File("ui/dist/index.html")
			}
		}
		return err
	}
}

func bindStaticAdminUI(e *core.ServeEvent) error {
	e.Router.GET(
		strings.TrimRight(pocketAdminPath, "/"),
		func(c echo.Context) error {
			return c.Redirect(http.StatusTemporaryRedirect, strings.TrimLeft(pocketAdminPath, "/"))
		},
	)

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
	collection.Name = "pa_collections"
	collection.Type = models.CollectionTypeView
	collection.ListRule = types.Pointer("")
	collection.ViewRule = types.Pointer("")

	collection.SetOptions(models.CollectionViewOptions{
		Query: `
	SELECT id, name, type, schema, listRule, viewRule, createRule, updateRule, deleteRule
	FROM _collections
	WHERE type IN ('base', 'auth')
	UNION ALL
	SELECT id, name, 'view' AS type, schema,
    NULL AS listRule,
    NULL AS viewRule,
    NULL AS createRule,
    NULL AS updateRule,
    NULL AS deleteRule
	FROM _collections
	WHERE id = 'admin_collections'`,
	})

	return app.Dao().SaveCollection(collection)
}

func createAdminRolesCollection(app core.App) error {
	collection, err := app.Dao().FindCollectionByNameOrId("admin_roles")
	if err == nil {
		return nil
	}

	collection = &models.Collection{}
	collection.MarkAsNew()
	collection.Id = "admin_roles"
	collection.Name = "pa_roles"
	collection.Type = models.CollectionTypeBase
	collection.ListRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.ViewRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.CreateRule = nil
	collection.UpdateRule = nil
	collection.DeleteRule = nil

	collection.Schema = schema.NewSchema(
		&schema.SchemaField{
			Name:     "name",
			Type:     schema.FieldTypeText,
			Required: true,
			Unique:   true,
		},
	)

	if err := app.Dao().SaveCollection(collection); err != nil {
		return err
	}

	roles := []string{"admin", "editor", "viewer"}
	for _, role := range roles {
		existingRole, _ := app.Dao().FindFirstRecordByData(collection.Id, "name", role)
		if existingRole == nil {
			record := models.NewRecord(collection)
			record.Set("name", role)
			if err := app.Dao().SaveRecord(record); err != nil {
				return err
			}
		}
	}

	return nil
}

func updateUsersCollection(app core.App) error {
	usersCollection, err := app.Dao().FindCollectionByNameOrId("users")
	if err != nil {
		return err
	}

	if usersCollection.Schema.GetFieldByName("role") == nil {
		roleField := &schema.SchemaField{
			Name:     "role",
			Type:     schema.FieldTypeRelation,
			Required: false,
			Options: &schema.RelationOptions{
				MaxSelect:     types.Pointer(1),
				CollectionId:  "admin_roles",
				CascadeDelete: false,
			},
		}

		usersCollection.Schema.AddField(roleField)
	}

	// Update the rules to allow admins to view and manage all users
	newRule := "id = @request.auth.id || @request.auth.role.name = 'admin'"
	usersCollection.ListRule = types.Pointer(newRule)
	usersCollection.ViewRule = types.Pointer(newRule)
	usersCollection.UpdateRule = types.Pointer(newRule)
	usersCollection.DeleteRule = types.Pointer(newRule)

	// Update AuthOptions
	authOptions := usersCollection.AuthOptions()
	authOptions.ManageRule = types.Pointer("@request.auth.role.name = 'admin'")
	usersCollection.SetOptions(authOptions)

	if err := app.Dao().SaveCollection(usersCollection); err != nil {
		return err
	}

	return nil
}

func createDefaultAdminUser(app core.App) error {
	usersCollection, err := app.Dao().FindCollectionByNameOrId("users")
	if err != nil {
		return fmt.Errorf("failed to find users collection: %v", err)
	}

	existingUser, _ := app.Dao().FindAuthRecordByEmail("users", "default@admin.pa")
	if existingUser != nil {
		log.Println("Default admin user already exists, skipping creation")
		return nil
	}

	adminRole, err := app.Dao().FindFirstRecordByData("admin_roles", "name", "admin")
	if err != nil {
		return fmt.Errorf("admin role not found: %v", err)
	}

	initialPassword := "default@admin.pa"

	user := models.NewRecord(usersCollection)
	user.Set("email", "default@admin.pa")
	user.Set("username", "defaultadmin")
	user.Set("role", adminRole.Id)
	user.Set("verified", true)

	if err := user.SetPassword(initialPassword); err != nil {
		return fmt.Errorf("failed to set password for default admin user: %v", err)
	}

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
	_, err := app.Dao().FindCollectionByNameOrId("admin_collections")
	if err != nil {
		if err := createAdminCollectionsView(app); err != nil {
			return err
		}
	}

	if err := createAdminRolesCollection(app); err != nil {
		return err
	}

	if err := updateUsersCollection(app); err != nil {
		return err
	}

	if err := createDefaultAdminUser(app); err != nil {
		return err
	}

	return nil
}

func createStatsHandler(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Parse time range
		timeRange := c.QueryParam("timeRange")
		var since time.Time
		switch timeRange {
		case "minute":
			since = time.Now().Add(-1 * time.Minute)
		case "hour":
			since = time.Now().Add(-1 * time.Hour)
		case "day":
			since = time.Now().AddDate(0, 0, -1)
		default:
			since = time.Now().AddDate(0, 0, -1) // Default to last 24 hours
		}

		// Query logs
		logs := []models.Log{}
		err := app.LogsDao().LogQuery().
			Where(dbx.And(
				dbx.NewExp("created >= {:since}", dbx.Params{"since": since}),
				dbx.NewExp("json_extract(data, '$.method') != ''"),
			)).
			OrderBy("created DESC").
			All(&logs)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
		}

		// Process logs
		totalRequests := len(logs)
		collectionCounts := make(map[string]int)
		methodCounts := make(map[string]int)

		for _, log := range logs {
			// Count collection access
			if collection, ok := log.Data["url"].(string); ok {
				collectionCounts[collection]++
			}

			// Count request methods
			if method, ok := log.Data["method"].(string); ok {
				methodCounts[method]++
			}
		}

		// Prepare response
		stats := map[string]interface{}{
			"totalRequests":      totalRequests,
			"requestsPerUnit":    float64(totalRequests) / time.Since(since).Hours(),
			"topEndpoints":       getTopN(collectionCounts, 10),
			"methodDistribution": methodCounts,
		}

		return c.JSON(http.StatusOK, stats)
	}
}

// Helper function to get top N items from a map
func getTopN(m map[string]int, n int) map[string]int {
	result := make(map[string]int)
	for k, v := range m {
		if len(result) < n {
			result[k] = v
		} else {
			for rk, rv := range result {
				if v > rv {
					delete(result, rk)
					result[k] = v
					break
				}
			}
		}
	}
	return result
}

func getTopCollectionsByRecordCount(app core.App) ([]map[string]interface{}, error) {
	// Fetch both base and auth collections
	baseCollections, err := app.Dao().FindCollectionsByType("base")
	if err != nil {
		return nil, fmt.Errorf("failed to fetch base collections: %v", err)
	}

	authCollections, err := app.Dao().FindCollectionsByType("auth")
	if err != nil {
		return nil, fmt.Errorf("failed to fetch auth collections: %v", err)
	}

	// Combine the collections
	collections := append(baseCollections, authCollections...)

	var results []map[string]interface{}
	for _, collection := range collections {
		query := app.Dao().RecordQuery(collection)
		var count int
		err := query.Select("count(*)").Row(&count)
		if err != nil {
			return nil, fmt.Errorf("failed to count records for collection %s: %v", collection.Name, err)
		}

		results = append(results, map[string]interface{}{
			"name":         collection.Name,
			"type":         collection.Type, // Include the collection type
			"record_count": count,
		})
	}

	// Sort results by record count in descending order
	sort.Slice(results, func(i, j int) bool {
		return results[i]["record_count"].(int) > results[j]["record_count"].(int)
	})

	// Return top 5 or all if less than 5
	if len(results) > 5 {
		return results[:5], nil
	}
	return results, nil
}

func main() {
	app := pocketbase.New()

	var hooksDir string
	var hooksWatch bool
	var hooksPool int
	var migrationsDir string
	var automigrate bool
	var publicDir string
	var indexFallback bool
	var queryTimeout int

	app.RootCmd.PersistentFlags().StringVar(&hooksDir, "hooksDir", "", "the directory with the JS app hooks")
	app.RootCmd.PersistentFlags().BoolVar(&hooksWatch, "hooksWatch", true, "auto restart the app on pb_hooks file change")
	app.RootCmd.PersistentFlags().IntVar(&hooksPool, "hooksPool", 25, "the total prewarm goja.Runtime instances for the JS app hooks execution")
	app.RootCmd.PersistentFlags().StringVar(&migrationsDir, "migrationsDir", "", "the directory with the user defined migrations")
	app.RootCmd.PersistentFlags().BoolVar(&automigrate, "automigrate", true, "enable/disable auto migrations")
	app.RootCmd.PersistentFlags().StringVar(&publicDir, "publicDir", defaultPublicDir(), "the directory to serve static files")
	app.RootCmd.PersistentFlags().BoolVar(&indexFallback, "indexFallback", true, "fallback the request to index.html on missing static path")
	app.RootCmd.PersistentFlags().IntVar(&queryTimeout, "queryTimeout", 30, "the default SELECT queries timeout in seconds")

	app.RootCmd.ParseFlags(os.Args[1:])

	jsvm.MustRegister(app, jsvm.Config{
		MigrationsDir: migrationsDir,
		HooksDir:      hooksDir,
		HooksWatch:    hooksWatch,
		HooksPoolSize: hooksPool,
	})

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		TemplateLang: migratecmd.TemplateLangJS,
		Automigrate:  automigrate,
		Dir:          migrationsDir,
	})

	ghupdate.MustRegister(app, app.RootCmd, ghupdate.Config{})

	app.OnAfterBootstrap().PreAdd(func(e *core.BootstrapEvent) error {
		app.Dao().ModelQueryTimeout = time.Duration(queryTimeout) * time.Second

		return nil
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		if err := setupCollections(app); err != nil {
			return err
		}

		bindStaticAdminUI(e)
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS(publicDir), indexFallback))
		e.Router.Use(indexFallbackMiddleware)

		// Get the server address from the ServeEvent
		serverAddress := e.App.Settings().Meta.AppUrl

		// Set up a goroutine to print the message after a short delay
		go func() {
			// Wait for a short time to ensure the server has started
			time.Sleep(100 * time.Millisecond)
			fmt.Printf("└─ Pocket Admin UI: %s%s\n", serverAddress, pocketAdminPath)
		}()

		// Add the new stats endpoint
		e.Router.AddRoute(echo.Route{
			Method:  http.MethodGet,
			Path:    "/api/stats",
			Handler: createStatsHandler(app),
		})

		e.Router.AddRoute(echo.Route{
			Method: http.MethodGet,
			Path:   "/api/top_collections",
			Handler: func(c echo.Context) error {
				topCollections, err := getTopCollectionsByRecordCount(app)
				if err != nil {
					return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
				}
				return c.JSON(http.StatusOK, topCollections)
			},
			Middlewares: []echo.MiddlewareFunc{
				apis.RequireRecordAuth(),
			},
		})

		return nil
	})

	app.OnModelBeforeCreate().Add(func(e *core.ModelEvent) error {
		if collection, ok := e.Model.(*models.Collection); ok {
			if collection.Type == models.CollectionTypeBase && collection.Name != "users" && collection.Id != "admin_roles" {
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

func defaultPublicDir() string {
	if strings.HasPrefix(os.Args[0], os.TempDir()) {
		return "./pb_public"
	}
	return filepath.Join(os.Args[0], "../pb_public")
}
