/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gl369g4bn4rekr5")

  collection.options = {
    "query": "SELECT id, name, type, schema, listRule, viewRule, createRule, updateRule, deleteRule\nFROM _collections\nWHERE type = 'base'"
  }

  // remove
  collection.schema.removeField("a1eorx8b")

  // remove
  collection.schema.removeField("ac5xuer7")

  // remove
  collection.schema.removeField("ccaaagix")

  // remove
  collection.schema.removeField("ynjkvcd1")

  // remove
  collection.schema.removeField("qo3ywmvb")

  // remove
  collection.schema.removeField("bxtyo2d9")

  // remove
  collection.schema.removeField("4jlumips")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gl369g4bn4rekr5")

  collection.options = {
    "query": "SELECT id, name, schema, listRule, viewRule, createRule, updateRule, deleteRule\nFROM _collections\nWHERE type = 'base'"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a1eorx8b",
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
    "id": "ac5xuer7",
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
    "id": "ccaaagix",
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
    "id": "ynjkvcd1",
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
    "id": "qo3ywmvb",
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
    "id": "bxtyo2d9",
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
    "id": "4jlumips",
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

  return dao.saveCollection(collection)
})
