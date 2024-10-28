package middleware

import (
	"net/http"

	"github.com/labstack/echo/v5"
)

func IndexFallback(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c echo.Context) error {
        err := next(c)
        if err != nil {
            he, ok := err.(*echo.HTTPError)
            if ok && he.Code == http.StatusNotFound {
                return c.File("ui/dist/index.html")
            }
        }
        return err
    }
}
