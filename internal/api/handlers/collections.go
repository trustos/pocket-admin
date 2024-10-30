package handlers

import (
	"net/http"
	"sort"

	"pocket-admin/internal/models/types"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
)

func GetTopCollectionsHandler(app core.App) echo.HandlerFunc {
    return func(c echo.Context) error {
        // Fetch both base and auth collections
        baseCollections, err := app.Dao().FindCollectionsByType("base")
        if err != nil {
            return c.JSON(http.StatusInternalServerError, map[string]string{
                "error": "Failed to fetch base collections",
            })
        }

        authCollections, err := app.Dao().FindCollectionsByType("auth")
        if err != nil {
            return c.JSON(http.StatusInternalServerError, map[string]string{
                "error": "Failed to fetch auth collections",
            })
        }

        // Combine collections and get record counts
        var results []types.TopCollection
        collections := append(baseCollections, authCollections...)

        for _, collection := range collections {
            query := app.Dao().RecordQuery(collection)
            var count int
            err := query.Select("count(*)").Row(&count)
            if err != nil {
                continue
            }

            results = append(results, types.TopCollection{
                Name:        collection.Name,
                Type:        collection.Type,
                RecordCount: count,
            })
        }

        // Sort by record count
        sort.Slice(results, func(i, j int) bool {
            return results[i].RecordCount > results[j].RecordCount
        })

        // Return top 5 or all if less than 5
        if len(results) > 5 {
            results = results[:5]
        }

        return c.JSON(http.StatusOK, results)
    }
}
