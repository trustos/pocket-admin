package types

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
	ID         string            `json:"id"`
	Name       string            `json:"name"`
	URL        string            `json:"url"`
	Headers    map[string]string `json:"headers"`
	Events     []string          `json:"events"`
	Enabled    bool              `json:"enabled"`
	RetryCount int               `json:"retryCount"`
	CreatedAt  string            `json:"createdAt"` // Changed from time.Time to string
	UpdatedAt  string            `json:"updatedAt"` // Changed from time.Time to string
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
