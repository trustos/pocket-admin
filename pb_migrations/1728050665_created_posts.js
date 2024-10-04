/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lhzuxw7055deg6r",
    "created": "2024-10-04 14:04:25.760Z",
    "updated": "2024-10-04 14:04:25.760Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "awegmnhb",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "vphgf9oz",
        "name": "content",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "pb0rosm5",
        "name": "published",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "tcngslle",
        "name": "promoted",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("lhzuxw7055deg6r");

  return dao.deleteCollection(collection);
})
