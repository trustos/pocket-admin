package hooks

import (
	"fmt"
	"log"
	"time"

	"pocket-admin/internal/models/types"
	"pocket-admin/internal/service"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

func RegisterWebhookHooks(app *pocketbase.PocketBase, webhookService *service.WebhookService) {
	app.OnModelAfterCreate().Add(func(e *core.ModelEvent) error {
		return triggerWebhooks(app, webhookService, "record.create", e.Model)
	})

	app.OnModelAfterUpdate().Add(func(e *core.ModelEvent) error {
		return triggerWebhooks(app, webhookService, "record.update", e.Model)
	})

	app.OnModelAfterDelete().Add(func(e *core.ModelEvent) error {
		return triggerWebhooks(app, webhookService, "record.delete", e.Model)
	})
}

func triggerWebhooks(app *pocketbase.PocketBase, webhookService *service.WebhookService, event string, model interface{}) error {
	collection, err := app.Dao().FindCollectionByNameOrId("admin_settings")
	if err != nil {
		log.Printf("Failed to find admin_settings collection: %v", err)
		return nil // Don't propagate webhook errors to prevent disrupting main operations
	}

	records := []models.Record{}
	err = app.Dao().RecordQuery(collection).All(&records)
	if err != nil {
		log.Printf("Failed to fetch webhook configurations: %v", err)
		return nil
	}

	payload := types.WebhookPayload{
		Event:     event,
		Timestamp: time.Now(),
		Data:      model,
	}

	for _, record := range records {
		var config types.WebhookConfig
		config.URL = record.GetString("url")
		config.Enabled = record.GetBool("enabled")
		config.RetryCount = record.GetInt("retryCount")

		// Parse headers from JSON
		if headers, ok := record.Get("headers").(map[string]interface{}); ok {
			config.Headers = make(map[string]string)
			for k, v := range headers {
				config.Headers[k] = fmt.Sprint(v)
			}
		}

		// Check if the event is in the configured events
		events := record.GetStringSlice("events")
		eventMatch := false
		for _, configEvent := range events {
			if configEvent == event {
				eventMatch = true
				break
			}
		}

		if config.Enabled && eventMatch {
			go func(cfg types.WebhookConfig) {
				if err := webhookService.SendWebhook(cfg, payload); err != nil {
					log.Printf("Failed to send webhook to %s: %v", cfg.URL, err)
				}
			}(config)
		}
	}

	return nil
}
