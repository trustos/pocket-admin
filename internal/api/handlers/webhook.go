package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"pocket-admin/internal/models/types"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
)

func ReloadWebhooksHandler(app core.App) echo.HandlerFunc {
	return func(c echo.Context) error {
		log.Println("Manual webhook reload requested")

		// Get current webhook settings
		collection, err := app.Dao().FindCollectionByNameOrId("admin_settings")
		if err != nil {
			log.Printf("Error finding admin_settings collection: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Failed to find admin settings",
			})
		}

		records, err := app.Dao().FindRecordsByExpr(collection.Id)
		if err != nil || len(records) == 0 {
			log.Printf("Error finding settings record: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Failed to find webhook settings",
			})
		}

		var settings types.WebhookSettings
		webhooksData := records[0].Get("webhooks")
		if webhooksData == nil {
			log.Println("No webhooks data found")
			return c.JSON(http.StatusOK, map[string]string{
				"message": "No webhook configurations found",
			})
		}

		// Parse webhook settings
		var jsonData []byte
		switch v := webhooksData.(type) {
		case []byte:
			jsonData = v
		case string:
			jsonData = []byte(v)
		default:
			jsonData, err = json.Marshal(webhooksData)
			if err != nil {
				log.Printf("Error marshaling webhook data: %v", err)
				return c.JSON(http.StatusInternalServerError, map[string]string{
					"error": "Failed to process webhook configurations",
				})
			}
		}

		if err := json.Unmarshal(jsonData, &settings); err != nil {
			log.Printf("Error unmarshaling webhook settings: %v", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Failed to parse webhook configurations",
			})
		}

		if err := settings.ValidateAndEnsureIDs(); err != nil {
			log.Printf("Invalid webhook configuration: %v", err)
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": fmt.Sprintf("Invalid webhook configuration: %v", err),
			})
		}

		// Log webhook configurations
		activeWebhooks := 0
		for _, entry := range settings.Entries {
			if entry.Enabled {
				activeWebhooks++
				log.Printf("Active webhook found - Name: %s, URL: %s, Events: %v",
					entry.Name, entry.URL, entry.Events)
			}
		}

		return c.JSON(http.StatusOK, map[string]interface{}{
			"message":         "Webhook configurations reloaded successfully",
			"active_webhooks": activeWebhooks,
			"total_webhooks":  len(settings.Entries),
		})
	}
}
