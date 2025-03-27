//Create Atlas Search Index

db.contacts.createSearchIndex({
  name: "searchaddress",
  definition: {
    mappings: {
      dynamic: false,
      fields: {
        address: {
          type: "string",
        },
      },
    },
  },
});
