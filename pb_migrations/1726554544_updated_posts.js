/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2iu2ohlxbiwjpsd")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "@request.auth.role ~ \"admin\" || (@request.auth.role ~ \"author\")"
  collection.updateRule = "@request.auth.role ~ \"admin\" || (@request.auth.role ~ \"author\")"
  collection.deleteRule = "@request.auth.role ~ \"admin\" || (@request.auth.role ~ \"author\")"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2iu2ohlxbiwjpsd")

  collection.listRule = "@request.auth.role ~ \"admin\" || @request.auth.role ~ \"author\""
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
