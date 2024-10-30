package collections

import (
	"fmt"
	"log"

	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
	"github.com/pocketbase/pocketbase/tools/types"
)

func UpdateUsersCollection(dao *daos.Dao) error {
    usersCollection, err := dao.FindCollectionByNameOrId("users")
    if err != nil {
        return err
    }

    if usersCollection.Schema.GetFieldByName("role") == nil {
        roleField := &schema.SchemaField{
            Name:     "role",
            Type:     schema.FieldTypeRelation,
            Required: false,
            Options: &schema.RelationOptions{
                MaxSelect:     types.Pointer(1),
                CollectionId:  "admin_roles",
                CascadeDelete: false,
            },
        }

        usersCollection.Schema.AddField(roleField)
    }

    // Update the rules to allow admins to view and manage all users
    newRule := "id = @request.auth.id || @request.auth.role.name = 'admin'"
    usersCollection.ListRule = types.Pointer(newRule)
    usersCollection.ViewRule = types.Pointer(newRule)
    usersCollection.UpdateRule = types.Pointer(newRule)
    usersCollection.DeleteRule = types.Pointer(newRule)

    // Update AuthOptions
    authOptions := usersCollection.AuthOptions()
    authOptions.ManageRule = types.Pointer("@request.auth.role.name = 'admin'")
    usersCollection.SetOptions(authOptions)

    return dao.SaveCollection(usersCollection)
}

func CreateDefaultAdminUser(dao *daos.Dao) error {
    usersCollection, err := dao.FindCollectionByNameOrId("users")
    if err != nil {
        return fmt.Errorf("failed to find users collection: %v", err)
    }

    existingUser, _ := dao.FindAuthRecordByEmail("users", "default@admin.pa")
    if existingUser != nil {
        log.Println("Default admin user already exists, skipping creation")
        return nil
    }

    adminRole, err := dao.FindFirstRecordByData("admin_roles", "name", "admin")
    if err != nil {
        return fmt.Errorf("admin role not found: %v", err)
    }

    initialPassword := "default@admin.pa"

    user := models.NewRecord(usersCollection)
    user.Set("email", "default@admin.pa")
    user.Set("username", "defaultadmin")
    user.Set("role", adminRole.Id)
    user.Set("verified", true)

    if err := user.SetPassword(initialPassword); err != nil {
        return fmt.Errorf("failed to set password for default admin user: %v", err)
    }

    if err := dao.SaveRecord(user); err != nil {
        return fmt.Errorf("failed to create default admin user: %v", err)
    }

    log.Println("Default admin user created successfully and verified")
    log.Printf("Default admin email: default@admin.pa")
    log.Printf("Default admin password: %s", initialPassword)
    log.Println("IMPORTANT: Please change this password immediately after your first login!")

    return nil
}
