/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gl369g4bn4rekr5")

  collection.options = {
    "query": "SELECT \n    id, \n    name, \n    type, \n    schema, \n    listRule, \n    viewRule, \n    createRule, \n    updateRule, \n    deleteRule\nFROM \n    _collections\nWHERE \n    type = 'base'\n\nUNION ALL\n\nSELECT \n    id, \n    name, \n    'view' AS type,  -- Hardcoding 'view' for this specific row\n    schema, \n    NULL AS listRule,  -- Set non-relevant fields to NULL\n    NULL AS viewRule,\n    NULL AS createRule,\n    NULL AS updateRule,\n    NULL AS deleteRule\nFROM \n    _collections\nWHERE \n    name = 'admin_collections'"
  }

  // remove
  collection.schema.removeField("u9as6hp4")

  // remove
  collection.schema.removeField("050io4sg")

  // remove
  collection.schema.removeField("0omjypcb")

  // remove
  collection.schema.removeField("gjeht62s")

  // remove
  collection.schema.removeField("8tlruo2y")

  // remove
  collection.schema.removeField("nc9wblmc")

  // remove
  collection.schema.removeField("ec8dubni")

  // remove
  collection.schema.removeField("mspy0vbn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r8emy0yo",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "spovsz6q",
    "name": "type",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ktrxazrq",
    "name": "schema",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g7qiunnz",
    "name": "listRule",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bnrz019r",
    "name": "viewRule",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q3rxgjni",
    "name": "createRule",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ybuirvko",
    "name": "updateRule",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okn5t6m2",
    "name": "deleteRule",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gl369g4bn4rekr5")

  collection.options = {
    "query": "SELECT \n    id, \n    name, \n    type, \n    schema, \n    listRule, \n    viewRule, \n    createRule, \n    updateRule, \n    deleteRule\nFROM \n    _collections\nWHERE \n    type = 'base'\n\nUNION ALL\n\nSELECT \n    id, \n    name, \n    'view' AS type,  -- Hardcoding 'view' for this specific row\n    schema, \n    NULL AS listRule,  -- Set non-relevant fields to NULL\n    NULL AS viewRule,\n    NULL AS createRule,\n    NULL AS updateRule,\n    NULL AS deleteRule\nFROM \n    _collections\nWHERE \n    type = 'view'"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u9as6hp4",
    "name": "name",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "050io4sg",
    "name": "type",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0omjypcb",
    "name": "schema",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gjeht62s",
    "name": "listRule",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8tlruo2y",
    "name": "viewRule",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nc9wblmc",
    "name": "createRule",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ec8dubni",
    "name": "updateRule",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mspy0vbn",
    "name": "deleteRule",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("r8emy0yo")

  // remove
  collection.schema.removeField("spovsz6q")

  // remove
  collection.schema.removeField("ktrxazrq")

  // remove
  collection.schema.removeField("g7qiunnz")

  // remove
  collection.schema.removeField("bnrz019r")

  // remove
  collection.schema.removeField("q3rxgjni")

  // remove
  collection.schema.removeField("ybuirvko")

  // remove
  collection.schema.removeField("okn5t6m2")

  return dao.saveCollection(collection)
})
