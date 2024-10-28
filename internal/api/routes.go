package api

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"pocket-admin/internal/api/handlers"
	"pocket-admin/ui"

	"github.com/labstack/echo/v5"
	echomiddleware "github.com/labstack/echo/v5/middleware"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

const AdminPath = "/admin/"

func RegisterRoutes(app core.App, e *core.ServeEvent) error {
	// Redirect /admin to /admin/
	e.Router.GET(
		strings.TrimRight(AdminPath, "/"),
		func(c echo.Context) error {
			return c.Redirect(http.StatusTemporaryRedirect, AdminPath)
		},
	)

	// Admin UI routes
	e.Router.GET(
		AdminPath+"*",
		func(c echo.Context) error {
			path := c.Request().URL.Path
			if strings.HasPrefix(path, AdminPath) {
				// Try to serve the actual file first
				err := echo.StaticDirectoryHandler(ui.DistDirFS, true)(c)
				if err != nil {
					// If file not found, serve index.html for SPA routing
					return c.FileFS("index.html", ui.DistDirFS)
				}
				return err
			}
			return echo.ErrNotFound
		},
		echomiddleware.Gzip(),
	)

	// Serve static files from public directory
	publicDir := getPublicDir()
	e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS(publicDir), true))

	// API routes
	apiGroup := e.Router.Group("/api")
	apiGroup.GET("/stats", handlers.CreateStatsHandler(app))
	apiGroup.GET("/top_collections", handlers.GetTopCollectionsHandler(app), apis.RequireRecordAuth())

	return nil
}

// Helper function to determine public directory path
func getPublicDir() string {
	if strings.HasPrefix(os.Args[0], os.TempDir()) {
		return "./pb_public"
	}
	return filepath.Join(os.Args[0], "../pb_public")
}
