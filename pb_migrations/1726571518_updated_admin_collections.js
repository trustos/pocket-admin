/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gl369g4bn4rekr5")

  collection.options = {
    "query": "SELECT \n    id, \n    name, \n    type, \n    schema, \n    listRule, \n    viewRule, \n    createRule, \n    updateRule, \n    deleteRule\nFROM \n    _collections\nWHERE \n    type = 'base'\n\nUNION ALL\n\nSELECT \n    id, \n    name, \n    'view' AS type,  -- Hardcoding 'view' for this specific row\n    schema, \n    NULL AS listRule,  -- Set non-relevant fields to NULL\n    NULL AS viewRule,\n    NULL AS createRule,\n    NULL AS updateRule,\n    NULL AS deleteRule\nFROM \n    _collections\nWHERE \n    type = 'view'"
  }

  // remove
  collection.schema.removeField("nq3omjpv")

  // remove
  collection.schema.removeField("p7nmpkgg")

  // remove
  collection.schema.removeField("1httn5em")

  // remove
  collection.schema.removeField("6m301ptg")

  // remove
  collection.schema.removeField("kfislyph")

  // remove
  collection.schema.removeField("funaiosm")

  // remove
  collection.schema.removeField("ptc9vgm3")

  // remove
  collection.schema.removeField("zz76tcur")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gl369g4bn4rekr5")

  collection.options = {
    "query": "SELECT id, name, type, schema, listRule, viewRule, createRule, updateRule, deleteRule\nFROM _collections\nWHERE type = 'base'"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nq3omjpv",
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
    "id": "p7nmpkgg",
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
    "id": "1httn5em",
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
    "id": "6m301ptg",
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
    "id": "kfislyph",
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
    "id": "funaiosm",
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
    "id": "ptc9vgm3",
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
    "id": "zz76tcur",
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

  return dao.saveCollection(collection)
})
