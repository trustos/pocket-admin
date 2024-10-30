package types

import (
	"fmt"

	"github.com/google/uuid"
)

// import "time"

type WebhookLog struct {
	ID        string `json:"id"`
	WebhookID string `json:"webhookId"`
	Event     string `json:"event"`
	Status    string `json:"status"`
	Response  string `json:"response"`
	Timestamp string `json:"timestamp"` // Changed from time.Time to string
	Retries   int    `json:"retries"`
}

type WebhookPayload struct {
	Event     string      `json:"event"`
	Timestamp string      `json:"timestamp"` // Changed from time.Time to string
	Data      interface{} `json:"data"`
}

// WebhookEntry remains the same but update timestamps
type WebhookEntry struct {
	ID         string            `json:"id"` // Required
	Name       string            `json:"name"`
	URL        string            `json:"url"`
	Headers    map[string]string `json:"headers"`
	Events     []string          `json:"events"`
	Enabled    bool              `json:"enabled"`
	RetryCount int               `json:"retryCount"`
	CreatedAt  string            `json:"createdAt"`
	UpdatedAt  string            `json:"updatedAt"`
}

type WebhookSettings struct {
	Entries []WebhookEntry `json:"entries"`
	Logs    []WebhookLog   `json:"logs"`
}

// WebhookConfig represents webhook configuration
type WebhookConfig struct {
	URL        string            `json:"url"`
	Headers    map[string]string `json:"headers"`
	Events     []string          `json:"events"`
	Enabled    bool              `json:"enabled"`
	RetryCount int               `json:"retryCount"`
}

// Collection specific structs
type Stats struct {
	TotalRequests      int            `json:"totalRequests"`
	RequestsPerUnit    float64        `json:"requestsPerUnit"`
	TopEndpoints       map[string]int `json:"topEndpoints"`
	MethodDistribution map[string]int `json:"methodDistribution"`
}

type TopCollection struct {
	Name        string `json:"name"`
	Type        string `json:"type"`
	RecordCount int    `json:"record_count"`
}

// Add validation method
func (w *WebhookEntry) Validate() error {
	if w.ID == "" {
		w.ID = uuid.New().String()
	}
	if w.Name == "" {
		return fmt.Errorf("webhook name is required")
	}
	if w.URL == "" {
		return fmt.Errorf("webhook URL is required")
	}
	if len(w.Events) == 0 {
		return fmt.Errorf("at least one event is required")
	}
	return nil
}

// Add webhook settings validation
func (ws *WebhookSettings) ValidateAndEnsureIDs() error {
	usedIDs := make(map[string]bool)

	for i := range ws.Entries {
		// Ensure ID exists
		if ws.Entries[i].ID == "" {
			ws.Entries[i].ID = uuid.New().String()
		}

		// Check for duplicate IDs
		if usedIDs[ws.Entries[i].ID] {
			return fmt.Errorf("duplicate webhook ID found: %s", ws.Entries[i].ID)
		}
		usedIDs[ws.Entries[i].ID] = true

		// Validate other fields
		if err := ws.Entries[i].Validate(); err != nil {
			return fmt.Errorf("invalid webhook entry %s: %w", ws.Entries[i].ID, err)
		}
	}
	return nil
}
