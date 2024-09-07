// onAfterBootstrap((e) => {
//   const collectionName = "admin_collections";

//   const collection = new Collection({
//     name: collectionName,
//     type: "view",
//     system: false,
//     schema: [
//       {
//         system: false,
//         name: "name",
//         type: "json",
//         required: false,
//         presentable: false,
//         unique: false,
//         options: {
//           maxSize: 1,
//         },
//       },
//     ],
//     indexes: [],
//     listRule: "",
//     viewRule: null,
//     createRule: null,
//     updateRule: null,
//     deleteRule: null,
//     options: {
//       query: "SELECT id, name, type\nFROM _collections\nWHERE type = 'base';\n",
//     },
//   });

//   $app.dao().saveCollection(collection);
// });
