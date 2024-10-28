package types

import "time"

// WebhookPayload represents the data sent to webhook endpoints
type WebhookPayload struct {
	Event     string      `json:"event"`
	Timestamp time.Time   `json:"timestamp"`
	Data      interface{} `json:"data"`
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
