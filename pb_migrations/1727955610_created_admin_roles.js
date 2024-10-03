/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "admin_roles",
    "created": "2024-10-03 11:40:10.110Z",
    "updated": "2024-10-03 11:40:10.110Z",
    "name": "admin_roles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7sqovwgf",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.role.name = 'admin'",
    "viewRule": "@request.auth.role.name = 'admin'",
    "createRule": "@request.auth.role.name = 'admin'",
    "updateRule": "@request.auth.role.name = 'admin'",
    "deleteRule": "@request.auth.role.name = 'admin'",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("admin_roles");

  return dao.deleteCollection(collection);
})
