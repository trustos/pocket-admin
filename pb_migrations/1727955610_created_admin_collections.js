/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "admin_collections",
    "created": "2024-10-03 11:40:10.108Z",
    "updated": "2024-10-03 11:40:10.108Z",
    "name": "admin_collections",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "phz5a9ic",
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
        "id": "e5yitml7",
        "name": "type",
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
        "id": "tgkqh8ci",
        "name": "schema",
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
        "id": "w1bbuyhb",
        "name": "listRule",
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
        "id": "fpmiscnn",
        "name": "viewRule",
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
        "id": "4lmen0aq",
        "name": "createRule",
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
        "id": "0j16dhca",
        "name": "updateRule",
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
        "id": "ivbnupyc",
        "name": "deleteRule",
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
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "\n\tSELECT id, name, type, schema, listRule, viewRule, createRule, updateRule, deleteRule\n\tFROM _collections\n\tWHERE type = 'base'\n\tUNION ALL\n\tSELECT id, name, 'view' AS type, schema,\n    NULL AS listRule,\n    NULL AS viewRule,\n    NULL AS createRule,\n    NULL AS updateRule,\n    NULL AS deleteRule\n\tFROM _collections\n\tWHERE name = 'admin_collections'"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("admin_collections");

  return dao.deleteCollection(collection);
})
