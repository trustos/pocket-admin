package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"pocket-admin/internal/models/types"
)

type WebhookService struct {
	client *http.Client
}

func NewWebhookService() *WebhookService {
	return &WebhookService{
		client: &http.Client{
			Timeout: time.Second * 10,
		},
	}
}

func (s *WebhookService) SendWebhook(config types.WebhookConfig, payload types.WebhookPayload) (int, error) {
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return 0, fmt.Errorf("failed to marshal payload: %v", err)
	}

	log.Printf("Attempting to send webhook to: %s", config.URL)
	log.Printf("Payload: %s", string(jsonData))

	var lastError error
	var attempts int

	for i := 0; i <= config.RetryCount; i++ {
		attempts = i + 1
		req, err := http.NewRequest("POST", config.URL, bytes.NewBuffer(jsonData))
		if err != nil {
			lastError = fmt.Errorf("failed to create request: %v", err)
			log.Printf("Failed to create request (attempt %d): %v", attempts, err)
			continue
		}

		req.Header.Set("Content-Type", "application/json")
		for key, value := range config.Headers {
			req.Header.Set(key, value)
		}

		resp, err := s.client.Do(req)
		if err == nil && resp.StatusCode >= 200 && resp.StatusCode < 300 {
			resp.Body.Close()
			return attempts, nil // Return number of attempts needed for success
		}

		if resp != nil {
			lastError = fmt.Errorf("HTTP %d: %s", resp.StatusCode, resp.Status)
			log.Printf("Webhook attempt %d failed with status: %d", attempts, resp.StatusCode)
			resp.Body.Close()
		} else if err != nil {
			lastError = err
			log.Printf("Webhook attempt %d failed with error: %v", attempts, err)
		}

		if i < config.RetryCount {
			backoffDuration := time.Second * time.Duration(i+1)
			log.Printf("Retrying webhook in %v...", backoffDuration)
			time.Sleep(backoffDuration)
		}
	}

	return attempts, fmt.Errorf("failed after %d attempts. Last error: %v", attempts, lastError)
}
