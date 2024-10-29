package hooks

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"pocket-admin/internal/models/types"
	"pocket-admin/internal/service"

	"github.com/google/uuid"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

func RegisterWebhookHooks(app *pocketbase.PocketBase, webhookService *service.WebhookService) {
	log.Println("Registering webhook hooks...")

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
	// Skip webhook triggers for admin_settings collection to prevent infinite loops
	if m, ok := model.(*models.Record); ok {
		if m.Collection().Name == "pa_settings" {
			log.Printf("Skipping webhook trigger for admin_settings collection")
			return nil
		}
	}

	log.Printf("Triggering webhooks for event: %s", event)

	collection, err := app.Dao().FindCollectionByNameOrId("admin_settings")
	if err != nil {
		log.Printf("Error finding admin_settings collection: %v", err)
		return fmt.Errorf("failed to find admin_settings collection: %w", err)
	}

	records, err := app.Dao().FindRecordsByExpr(collection.Id)
	if err != nil || len(records) == 0 {
		log.Printf("Error finding settings record: %v", err)
		return fmt.Errorf("failed to find settings record: %w", err)
	}
	record := records[0]

	var settings types.WebhookSettings
	webhooksData := record.Get("webhooks")
	if webhooksData == nil {
		log.Printf("No webhooks data found")
		return nil
	}

	var jsonData []byte
	switch v := webhooksData.(type) {
	case []byte:
		jsonData = v
	case string:
		jsonData = []byte(v)
	default:
		var err error
		jsonData, err = json.Marshal(webhooksData)
		if err != nil {
			log.Printf("Error marshaling webhook data: %v", err)
			return fmt.Errorf("failed to marshal webhook data: %w", err)
		}
	}

	if err := json.Unmarshal(jsonData, &settings); err != nil {
		log.Printf("Error unmarshaling webhook settings: %v", err)
		return fmt.Errorf("failed to unmarshal webhook settings: %w", err)
	}

	if len(settings.Entries) == 0 {
		log.Printf("No webhook entries found")
		return nil
	}

	logsUpdated := false
	for _, entry := range settings.Entries {
		if !entry.Enabled {
			log.Printf("Skipping disabled webhook: %s", entry.Name)
			continue
		}

		eventMatch := false
		for _, configEvent := range entry.Events {
			if configEvent == event {
				eventMatch = true
				break
			}
		}

		if eventMatch {
			config := types.WebhookConfig{
				URL:        entry.URL,
				Headers:    entry.Headers,
				RetryCount: entry.RetryCount,
			}

			now := time.Now().UTC().Format("2006-01-02 15:04:05.000Z")

			payload := types.WebhookPayload{
				Event:     event,
				Timestamp: now,
				Data:      model,
			}

			webhookLog := types.WebhookLog{
				ID:        uuid.New().String(),
				WebhookID: entry.ID,
				Event:     event,
				Timestamp: now,
				Retries:   0,
			}

			log.Printf("Executing webhook '%s' for event '%s' to URL: %s", entry.Name, event, entry.URL)

			// Execute webhook synchronously to avoid race conditions
			attempts, err := webhookService.SendWebhook(config, payload)
			webhookLog.Retries = attempts - 1 // Subtract 1 as first attempt isn't a retry

			if err != nil {
				webhookLog.Status = "failed"
				webhookLog.Response = err.Error()
				log.Printf("Webhook '%s' failed after %d attempts: %v", entry.Name, attempts, err)
			} else {
				webhookLog.Status = "success"
				webhookLog.Response = "OK"
				if attempts > 1 {
					log.Printf("Webhook '%s' executed successfully after %d attempts", entry.Name, attempts)
				} else {
					log.Printf("Webhook '%s' executed successfully on first attempt", entry.Name)
				}
			}

			// Update settings with new log
			settings.Logs = append(settings.Logs, webhookLog)
			logsUpdated = true
		}
	}

	// Only update if there are new logs
	if logsUpdated {
		log.Printf("Updating webhook logs...")

		// Trim logs if necessary
		if len(settings.Logs) > 100 {
			settings.Logs = settings.Logs[len(settings.Logs)-100:]
			log.Printf("Trimmed logs to last 100 entries")
		}

		// Save updated settings
		updatedJSON, err := json.Marshal(settings)
		if err != nil {
			log.Printf("Error marshaling updated settings: %v", err)
			return fmt.Errorf("failed to marshal updated settings: %w", err)
		}

		// Update the record
		record.Set("webhooks", string(updatedJSON))

		// Use direct SQL update to avoid triggering hooks
		_, updateErr := app.Dao().DB().NewQuery("UPDATE pa_settings SET webhooks = {:webhooks} WHERE id = {:id}").
			Bind(dbx.Params{
				"webhooks": string(updatedJSON),
				"id":       record.Id,
			}).
			Execute()

		if updateErr != nil {
			log.Printf("Error saving updated webhook logs for event %s: %v", event, updateErr)
			return fmt.Errorf("failed to save webhook logs: %w", updateErr)
		}

		log.Printf("Successfully updated webhook logs with %d new entries", len(settings.Logs))
	}

	return nil
}
