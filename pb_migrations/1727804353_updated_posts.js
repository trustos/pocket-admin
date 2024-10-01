/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2iu2ohlxbiwjpsd")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2iu2ohlxbiwjpsd")

  collection.createRule = "@request.auth.role ~ \"admin\" || (@request.auth.role ~ \"author\")"

  return dao.saveCollection(collection)
})
