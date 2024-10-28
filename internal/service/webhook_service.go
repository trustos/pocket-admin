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

func (s *WebhookService) SendWebhook(config types.WebhookConfig, payload types.WebhookPayload) error {
    jsonData, err := json.Marshal(payload)
    if err != nil {
        return fmt.Errorf("failed to marshal payload: %v", err)
    }

    for i := 0; i <= config.RetryCount; i++ {
        req, err := http.NewRequest("POST", config.URL, bytes.NewBuffer(jsonData))
        if err != nil {
            log.Printf("Failed to create request (attempt %d): %v", i+1, err)
            continue
        }

        req.Header.Set("Content-Type", "application/json")
        for key, value := range config.Headers {
            req.Header.Set(key, value)
        }

        resp, err := s.client.Do(req)
        if err == nil && resp.StatusCode >= 200 && resp.StatusCode < 300 {
            resp.Body.Close()
            return nil
        }

        if resp != nil {
            log.Printf("Webhook attempt %d failed with status: %d", i+1, resp.StatusCode)
            resp.Body.Close()
        } else if err != nil {
            log.Printf("Webhook attempt %d failed with error: %v", i+1, err)
        }

        if i < config.RetryCount {
            backoffDuration := time.Second * time.Duration(i+1)
            log.Printf("Retrying webhook in %v...", backoffDuration)
            time.Sleep(backoffDuration)
        }
    }

    return fmt.Errorf("failed to send webhook after %d retries", config.RetryCount)
}
