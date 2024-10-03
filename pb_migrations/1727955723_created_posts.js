/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zbbc226em4xyye4",
    "created": "2024-10-03 11:42:03.249Z",
    "updated": "2024-10-03 11:42:03.249Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yrknghzg",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
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
  const collection = dao.findCollectionByNameOrId("zbbc226em4xyye4");

  return dao.deleteCollection(collection);
})
