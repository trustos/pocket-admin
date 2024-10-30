package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"pocket-admin/internal/api"
	"pocket-admin/internal/hooks"
	"pocket-admin/internal/service"
	"pocket-admin/internal/setup"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/plugins/ghupdate"
	"github.com/pocketbase/pocketbase/plugins/jsvm"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/pocketbase/pocketbase/tools/types"
)

func defaultPublicDir() string {
	if strings.HasPrefix(os.Args[0], os.TempDir()) {
		return "./pb_public"
	}
	return filepath.Join(os.Args[0], "../pb_public")
}

func main() {
	app := pocketbase.New()

	// Initialize services
	webhookService := service.NewWebhookService()

	// Command line flags
	var (
		hooksDir      string
		hooksWatch    bool
		hooksPool     int
		migrationsDir string
		automigrate   bool
		publicDir     string
		indexFallback bool
		queryTimeout  int
	)

	app.RootCmd.PersistentFlags().StringVar(
		&hooksDir,
		"hooksDir",
		"",
		"the directory with the JS app hooks",
	)
	app.RootCmd.PersistentFlags().BoolVar(
		&hooksWatch,
		"hooksWatch",
		true,
		"auto restart the app on pb_hooks file change",
	)
	app.RootCmd.PersistentFlags().IntVar(
		&hooksPool,
		"hooksPool",
		25,
		"the total prewarm goja.Runtime instances for the JS app hooks execution",
	)
	app.RootCmd.PersistentFlags().StringVar(
		&migrationsDir,
		"migrationsDir",
		"",
		"the directory with the user defined migrations",
	)
	app.RootCmd.PersistentFlags().BoolVar(
		&automigrate,
		"automigrate",
		true,
		"enable/disable auto migrations",
	)
	app.RootCmd.PersistentFlags().StringVar(
		&publicDir,
		"publicDir",
		defaultPublicDir(),
		"the directory to serve static files",
	)
	app.RootCmd.PersistentFlags().BoolVar(
		&indexFallback,
		"indexFallback",
		true,
		"fallback the request to index.html on missing static path",
	)
	app.RootCmd.PersistentFlags().IntVar(
		&queryTimeout,
		"queryTimeout",
		30,
		"the default SELECT queries timeout in seconds",
	)

	app.RootCmd.ParseFlags(os.Args[1:])

	// Register plugins
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

	// Set query timeout after bootstrap
	app.OnAfterBootstrap().PreAdd(func(e *core.BootstrapEvent) error {
		app.Dao().ModelQueryTimeout = time.Duration(queryTimeout) * time.Second
		return nil
	})

	// Setup collections and routes before serving
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// Setup collections
		if err := setup.SetupCollections(app); err != nil {
			return fmt.Errorf("failed to setup collections: %w", err)
		}

		// Register webhook hooks
		hooks.RegisterWebhookHooks(app, webhookService)

		// Register routes
		if err := api.RegisterRoutes(app, e); err != nil {
			return fmt.Errorf("failed to register routes: %w", err)
		}

		// Log admin UI URL
		serverAddress := app.Settings().Meta.AppUrl
		go func() {
			time.Sleep(100 * time.Millisecond)
			fmt.Printf("└─ Pocket Admin UI: %s%s\n", serverAddress, api.AdminPath)
		}()

		return nil
	})

	// Set default collection rules for new collections
	app.OnModelBeforeCreate().Add(func(e *core.ModelEvent) error {
		if collection, ok := e.Model.(*models.Collection); ok {
			if collection.Type == models.CollectionTypeBase &&
				collection.Name != "users" &&
				collection.Id != "admin_roles" {
				adminRule := types.Pointer("@request.auth.role.name = 'admin'")
				collection.ListRule = adminRule
				collection.ViewRule = adminRule
				collection.CreateRule = adminRule
				collection.UpdateRule = adminRule
				collection.DeleteRule = adminRule
			}
		}
		return nil
	})

	// Start the application
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
