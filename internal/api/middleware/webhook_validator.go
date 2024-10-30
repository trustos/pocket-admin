package middleware

import (
	"encoding/json"
	"pocket-admin/internal/models/types"

	"github.com/labstack/echo/v5"
)

func ValidateWebhookSettings(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c echo.Context) error {
        // Only apply to webhook-related endpoints
        if c.Path() == "/api/webhooks/*" {
            body := make(map[string]interface{})
            if err := c.Bind(&body); err != nil {
                return c.JSON(400, map[string]string{"error": "Invalid request body"})
            }

            if webhooksData, ok := body["webhooks"]; ok {
                var settings types.WebhookSettings
                jsonData, err := json.Marshal(webhooksData)
                if err != nil {
                    return c.JSON(400, map[string]string{"error": "Invalid webhook data"})
                }

                if err := json.Unmarshal(jsonData, &settings); err != nil {
                    return c.JSON(400, map[string]string{"error": "Invalid webhook format"})
                }

                if err := settings.ValidateAndEnsureIDs(); err != nil {
                    return c.JSON(400, map[string]string{"error": err.Error()})
                }

                // Update the request body with validated settings
                body["webhooks"] = settings
                c.Set("body", body)
            }
        }
        return next(c)
    }
}
