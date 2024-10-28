package setup

import (
	"fmt"
	"log"

	"pocket-admin/internal/models/collections"

	"github.com/pocketbase/pocketbase"
)

func SetupCollections(app *pocketbase.PocketBase) error {
    // Create admin collections view
    _, err := app.Dao().FindCollectionByNameOrId("admin_collections")
    if err != nil {
        if err := collections.CreateAdminCollectionsView(app.Dao()); err != nil {
            return err
        }
        log.Println("Created admin collections view")
    }

    // Create admin roles collection
    _, err = app.Dao().FindCollectionByNameOrId("admin_roles")
    if err != nil {
        if err := collections.CreateAdminRolesCollection(app.Dao()); err != nil {
            return err
        }
        log.Println("Created admin roles collection")
    }

    // Create admin settings collection
    _, err = app.Dao().FindCollectionByNameOrId("admin_settings")
    if err != nil {
        if err := collections.CreateAdminSettingsCollection(app.Dao()); err != nil {
            return err
        }
        log.Println("Created admin settings collection")
    }

    // Update users collection and create default admin user
    if err := collections.UpdateUsersCollection(app.Dao()); err != nil {
        return fmt.Errorf("failed to update users collection: %w", err)
    }

    if err := collections.CreateDefaultAdminUser(app.Dao()); err != nil {
        return fmt.Errorf("failed to create default admin user: %w", err)
    }

    return nil
}
