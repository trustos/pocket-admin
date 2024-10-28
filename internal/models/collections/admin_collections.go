package collections

import (
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tools/types"
)

func NewAdminCollectionsView() *models.Collection {
	collection := &models.Collection{}
	collection.MarkAsNew()
	collection.Id = "admin_collections"
	collection.Name = "pa_collections"
	collection.Type = models.CollectionTypeView
	collection.ListRule = types.Pointer("")
	collection.ViewRule = types.Pointer("")

	collection.SetOptions(models.CollectionViewOptions{
		Query: `
        SELECT id, name, type, schema, listRule, viewRule, createRule, updateRule, deleteRule
        FROM _collections
        WHERE type IN ('base', 'auth')
        UNION ALL
        SELECT id, name, 'view' AS type, schema,
        NULL AS listRule,
        NULL AS viewRule,
        NULL AS createRule,
        NULL AS updateRule,
        NULL AS deleteRule
        FROM _collections
        WHERE id = 'admin_collections'`,
	})

	return collection
}

func CreateAdminCollectionsView(dao *daos.Dao) error {
	collection := NewAdminCollectionsView()
	return dao.SaveCollection(collection)
}
