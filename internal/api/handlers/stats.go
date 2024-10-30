package handlers

import (
	"net/http"
	"sort"
	"time"

	"pocket-admin/internal/models/types"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

func CreateStatsHandler(app core.App) echo.HandlerFunc {
    return func(c echo.Context) error {
        timeRange := c.QueryParam("timeRange")
        var since time.Time

        switch timeRange {
        case "minute":
            since = time.Now().Add(-1 * time.Minute)
        case "hour":
            since = time.Now().Add(-1 * time.Hour)
        case "day":
            since = time.Now().AddDate(0, 0, -1)
        default:
            since = time.Now().AddDate(0, 0, -1)
        }

        logs := []models.Log{}
        err := app.LogsDao().LogQuery().
            Where(dbx.And(
                dbx.NewExp("created >= {:since}", dbx.Params{"since": since}),
                dbx.NewExp("json_extract(data, '$.method') != ''"),
            )).
            OrderBy("created DESC").
            All(&logs)

        if err != nil {
            return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
        }

        stats := processStats(logs, since)
        return c.JSON(http.StatusOK, stats)
    }
}

func processStats(logs []models.Log, since time.Time) types.Stats {
    totalRequests := len(logs)
    collectionCounts := make(map[string]int)
    methodCounts := make(map[string]int)

    for _, log := range logs {
        if collection, ok := log.Data["url"].(string); ok {
            collectionCounts[collection]++
        }

        if method, ok := log.Data["method"].(string); ok {
            methodCounts[method]++
        }
    }

    return types.Stats{
        TotalRequests:      totalRequests,
        RequestsPerUnit:    float64(totalRequests) / time.Since(since).Hours(),
        TopEndpoints:       getTopN(collectionCounts, 10),
        MethodDistribution: methodCounts,
    }
}

func getTopN(m map[string]int, n int) map[string]int {
    // Convert map to slice of pairs
    pairs := make([]struct {
        k string
        v int
    }, 0, len(m))

    for k, v := range m {
        pairs = append(pairs, struct {
            k string
            v int
        }{k, v})
    }

    // Sort slice by value
    sort.Slice(pairs, func(i, j int) bool {
        return pairs[i].v > pairs[j].v
    })

    // Take top N
    result := make(map[string]int)
    for i := 0; i < n && i < len(pairs); i++ {
        result[pairs[i].k] = pairs[i].v
    }

    return result
}
