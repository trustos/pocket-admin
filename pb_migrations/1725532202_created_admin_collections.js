/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "gl369g4bn4rekr5",
    "created": "2024-09-05 10:30:02.916Z",
    "updated": "2024-09-05 10:30:02.916Z",
    "name": "admin_collections",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "s4nxv6od",
        "name": "name",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "zlh2qdhf",
        "name": "type",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, name, type\nFROM _collections\nWHERE type = 'base'"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("gl369g4bn4rekr5");

  return dao.deleteCollection(collection);
})
