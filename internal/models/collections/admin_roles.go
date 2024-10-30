package collections

import (
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
	"github.com/pocketbase/pocketbase/tools/types"
)

func NewAdminRolesCollection() *models.Collection {
	collection := &models.Collection{}
	collection.MarkAsNew()
	collection.Id = "admin_roles"
	collection.Name = "pa_roles"
	collection.Type = models.CollectionTypeBase
	collection.ListRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.ViewRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.CreateRule = nil
	collection.UpdateRule = nil
	collection.DeleteRule = nil

	collection.Schema = schema.NewSchema(
		&schema.SchemaField{
			Name:     "name",
			Type:     schema.FieldTypeText,
			Required: true,
			Unique:   true,
		},
	)

	return collection
}

func CreateAdminRolesCollection(dao *daos.Dao) error {
	collection := NewAdminRolesCollection()
	if err := dao.SaveCollection(collection); err != nil {
		return err
	}

	// Create default roles
	roles := []string{"admin", "editor", "viewer"}
	for _, role := range roles {
		record := models.NewRecord(collection)
		record.Set("name", role)
		if err := dao.SaveRecord(record); err != nil {
			return err
		}
	}

	return nil
}
