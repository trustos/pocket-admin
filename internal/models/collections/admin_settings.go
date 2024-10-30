package collections

import (
	pockettypes "pocket-admin/internal/models/types"

	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
	"github.com/pocketbase/pocketbase/tools/types"
)

func NewAdminSettingsCollection() *models.Collection {
	collection := &models.Collection{}
	collection.MarkAsNew()
	collection.Id = "admin_settings"
	collection.Name = "pa_settings"
	collection.Type = models.CollectionTypeBase
	collection.ListRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.ViewRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.CreateRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.UpdateRule = types.Pointer("@request.auth.role.name = 'admin'")
	collection.DeleteRule = types.Pointer("@request.auth.role.name = 'admin'")

	collection.Schema = schema.NewSchema(
		&schema.SchemaField{
			Name:     "webhooks",
			Type:     schema.FieldTypeJson,
			Required: true,
			Options: &schema.JsonOptions{
				MaxSize: 2000000,
			},
		},
		// &schema.SchemaField{
		// 	Name:     "name",
		// 	Type:     schema.FieldTypeText,
		// 	Required: true,
		// },
		// &schema.SchemaField{
		// 	Name:     "url",
		// 	Type:     schema.FieldTypeUrl,
		// 	Required: true,
		// },
		// &schema.SchemaField{
		// 	Name:     "headers",
		// 	Type:     schema.FieldTypeJson,
		// 	Required: false,
		// 	Options: &schema.JsonOptions{
		// 		MaxSize: 2000000}, // Just use empty options
		// },
		// &schema.SchemaField{
		// 	Name:     "events",
		// 	Type:     schema.FieldTypeSelect,
		// 	Required: true,
		// 	Options: &schema.SelectOptions{
		// 		Values: []string{
		// 			"record.create",
		// 			"record.update",
		// 			"record.delete",
		// 		},
		// 		MaxSelect: 10,
		// 	},
		// },
		// &schema.SchemaField{
		// 	Name:     "enabled",
		// 	Type:     schema.FieldTypeBool,
		// 	Required: true,
		// 	Options:  &schema.BoolOptions{}, // Empty options
		// },
		// &schema.SchemaField{
		// 	Name:     "retryCount",
		// 	Type:     schema.FieldTypeNumber,
		// 	Required: true,
		// 	Options: &schema.NumberOptions{
		// 		Min: types.Pointer(0.0),
		// 		Max: types.Pointer(5.0),
		// 	},
		// },
	)

	return collection
}

func CreateAdminSettingsCollection(dao *daos.Dao) error {
	collection := NewAdminSettingsCollection()
	if err := dao.SaveCollection(collection); err != nil {
		return err
	}

	// Create default settings record with empty webhook configurations
	record := models.NewRecord(collection)
	record.Set("webhooks", pockettypes.WebhookSettings{
		Entries: []pockettypes.WebhookEntry{},
		Logs:    []pockettypes.WebhookLog{},
	})

	return dao.SaveRecord(record)
}
