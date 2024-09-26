/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2iu2ohlxbiwjpsd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pxajwtxi",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 3,
      "values": [
        "blogpost",
        "page",
        "ad"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2iu2ohlxbiwjpsd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pxajwtxi",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "blogpost",
        "page",
        "ad"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
