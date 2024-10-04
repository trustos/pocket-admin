/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lhzuxw7055deg6r")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hzki2jzo",
    "name": "cover",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/jp2",
        "image/jpx",
        "image/jpm",
        "image/png",
        "image/vnd.mozilla.apng",
        "image/gif",
        "image/x-xpixmap",
        "image/vnd.adobe.photoshop",
        "image/jxl",
        "image/jxs",
        "image/tiff",
        "image/bmp",
        "image/webp",
        "image/x-icon",
        "image/vnd.djvu",
        "image/bpg",
        "image/vnd.dwg",
        "image/x-icns",
        "image/heic",
        "image/heic-sequence",
        "image/heif",
        "image/heif-sequence",
        "image/vnd.radiance",
        "image/x-xcf",
        "image/x-gimp-pat",
        "image/x-gimp-gbr",
        "image/avif",
        "image/jxr",
        "image/svg+xml"
      ],
      "thumbs": [],
      "maxSelect": 99,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lhzuxw7055deg6r")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hzki2jzo",
    "name": "cover",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/jp2",
        "image/jpx",
        "image/jpm",
        "image/png",
        "image/vnd.mozilla.apng",
        "image/gif",
        "image/x-xpixmap",
        "image/vnd.adobe.photoshop",
        "image/jxl",
        "image/jxs",
        "image/tiff",
        "image/bmp",
        "image/webp",
        "image/x-icon",
        "image/vnd.djvu",
        "image/bpg",
        "image/vnd.dwg",
        "image/x-icns",
        "image/heic",
        "image/heic-sequence",
        "image/heif",
        "image/heif-sequence",
        "image/vnd.radiance",
        "image/x-xcf",
        "image/x-gimp-pat",
        "image/x-gimp-gbr",
        "image/avif",
        "image/jxr",
        "image/svg+xml"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
