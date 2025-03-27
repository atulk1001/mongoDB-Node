const DBConnection = require("./mongoClientv2");

async function createSalesCollection() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");

  const validationRules = {
      "$and": [
        {
          $expr: {
            $lt: ["$items.discountedPrice", "$price"],
            $lt: ["$items.tax", "$price"],
          },
        },
        {
          $jsonSchema: {
            bsonType: "object",
            required: [
              "orderNo",
              "price",
              "discountedPrice",
              "items",
              "purchaseDate",
              "tax",
              "total",
            ],
            properties: {
              orderNo: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              price: {
                bsonType: "number",
                description: "must be a number and is required",
              },
              discountedPrice: {
                bsonType: "number",
                description: "must be a number and is required",
              },
              items: {
                bsonType: "array",
                description: "must be an array and is required",
                items: {
                  bsonType: "object",
                  required: ["itemId", "name", "qty"],
                  properties: {
                    itemId: {
                      bsonType: "string",
                      description: "must be a string and is required",
                    },
                    name: {
                      bsonType: "string",
                      description: "must be a string and is required",
                    },
                    qty: {
                      bsonType: "number",
                      description: "must be a number and is required",
                    },
                  },
                },
              },
              purchaseDate: {
                bsonType: "date",
                description: "must be a date and is required",
              },
              tax: {
                bsonType: "number",
                description: "must be a number and is required",
                minimum: 0,
                maximum: ("$price" * 50) / 100,
                description: "must be a number less than price and is required",
              },
              total: {
                bsonType: "number",
                description: "must be a number and is required",
              },
            },
            additionalProperties: false,
          },
        },
      ]
  };

  await db.createCollection("sales", {
    validator: validationRules,
  });

  await db.collection("sales").createIndex({ orderNo: 1 }, { unique: true });

  console.log(
    "Sales collection created with validation rules and unique index on orderNo."
  );
}

createSalesCollection();

// insert data

  const salesRecords = [
    {
      orderNo: "ORD001",
      price: 100.0,
      discountedPrice: 90.0,
      items: [
        { itemId: "I001", name: "Item 1", qty: 2 },
        { itemId: "I002", name: "Item 2", qty: 1 }
      ],
      purchaseDate: new Date("2025-01-01"),
      tax: 5.0,
      total: 95.0
    },
    {
      orderNo: "ORD002",
      price: 200.0,
      discountedPrice: 180.0,
      items: [
        { itemId: "I003", name: "Item 3", qty: 1 },
        { itemId: "I004", name: "Item 4", qty: 3 }
      ],
      purchaseDate: new Date("2025-01-02"),
      tax: 10.0,
      total: 190.0
    },
    {
      orderNo: "ORD003",
      price: 150.0,
      discountedPrice: 135.0,
      items: [
        { itemId: "I005", name: "Item 5", qty: 2 },
        { itemId: "I006", name: "Item 6", qty: 1 }
      ],
      purchaseDate: new Date("2025-01-03"),
      tax: 7.5,
      total: 142.5
    },
    {
      orderNo: "ORD004",
      price: 250.0,
      discountedPrice: 225.0,
      items: [
        { itemId: "I007", name: "Item 7", qty: 1 },
        { itemId: "I008", name: "Item 8", qty: 4 }
      ],
      purchaseDate: new Date("2025-01-04"),
      tax: 12.5,
      total: 237.5
    },
    {
      orderNo: "ORD005",
      price: 300.0,
      discountedPrice: 270.0,
      items: [
        { itemId: "I009", name: "Item 9", qty: 3 },
        { itemId: "I010", name: "Item 10", qty: 2 }
      ],
      purchaseDate: new Date("2025-01-05"),
      tax: 15.0,
      total: 285.0
    },
    {
      orderNo: "ORD006",
      price: 120.0,
      discountedPrice: 108.0,
      items: [
        { itemId: "I011", name: "Item 11", qty: 1 },
        { itemId: "I012", name: "Item 12", qty: 2 }
      ],
      purchaseDate: new Date("2025-01-06"),
      tax: 6.0,
      total: 114.0
    },
    {
      orderNo: "ORD007",
      price: 180.0,
      discountedPrice: 162.0,
      items: [
        { itemId: "I013", name: "Item 13", qty: 2 },
        { itemId: "I014", name: "Item 14", qty: 1 }
      ],
      purchaseDate: new Date("2025-01-07"),
      tax: 9.0,
      total: 171.0
    },
    {
      orderNo: "ORD008",
      price: 220.0,
      discountedPrice: 198.0,
      items: [
        { itemId: "I015", name: "Item 15", qty: 1 },
        { itemId: "I016", name: "Item 16", qty: 3 }
      ],
      purchaseDate: new Date("2025-01-08"),
      tax: 11.0,
      total: 209.0
    },
    {
      orderNo: "ORD009",
      price: 140.0,
      discountedPrice: 126.0,
      items: [
        { itemId: "I017", name: "Item 17", qty: 2 },
        { itemId: "I018", name: "Item 18", qty: 1 }
      ],
      purchaseDate: new Date("2025-01-09"),
      tax: 7.0,
      total: 133.0
    },
    {
      orderNo: "ORD010",
      price: 160.0,
      discountedPrice: 144.0,
      items: [
        { itemId: "I019", name: "Item 19", qty: 1 },
        { itemId: "I020", name: "Item 20", qty: 2 }
      ],
      purchaseDate: new Date("2025-01-10"),
      tax: 8.0,
      total: 152.0
    },
    {
      orderNo: "ORD011",
      price: 110.0,
      discountedPrice: 99.0,
      items: [
        { itemId: "I021", name: "Item 21", qty: 1 },
        { itemId: "I022", name: "Item 22", qty: 1 }
      ],
      purchaseDate: new Date("2025-01-11"),
      tax: 5.5,
      total: 104.5
    },
    {
      orderNo: "ORD012",
      price: 130.0,
      discountedPrice: 117.0,
      items: [
        { itemId: "I023", name: "Item 23", qty: 2 },
        { itemId: "I024", name: "Item 24", qty: 1 }
      ],
      purchaseDate: new Date("2025-01-12"),
      tax: 6.5,
      total: 123.5
    },
    {
      orderNo: "ORD013",
      price: 170.0,
      discountedPrice: 153.0,
      items: [
        { itemId: "I025", name: "Item 25", qty: 1 },
        { itemId: "I026", name: "Item 26", qty: 2 }
      ],
      purchaseDate: new Date("2025-01-13"),
      tax: 8.5,
      total: 161.5
    },
    {
      orderNo: "ORD014",
      price: 190.0,
      discountedPrice: 171.0,
      items: [
        { itemId: "I027", name: "Item 27", qty: 2 },
        { itemId: "I028", name: "Item 28", qty: 1 }
      ],
      purchaseDate: new Date("2025-01-14"),
      tax: 9.5,
      total: 180.5
    },
    {
      orderNo: "ORD015",
      price: 210.0,
      discountedPrice: 189.0,
      items: [
        { itemId: "I029", name: "Item 29", qty: 1 },
        { itemId: "I030", name: "Item 30", qty: 3 }
      ],
      purchaseDate: new Date("2025-01-15"),
      tax: 10.5,
      total: 199.5
    },
    {
      orderNo: "ORD016",
      price: 230.0,
      discountedPrice: 207.0,
      items: [
        { itemId: "I031", name: "Item 31", qty: 2 },
        { itemId: "I032", name: "Item 32", qty: 1 }
      ],
      purchaseDate: new Date("2025-01-16"),
      tax: 11.5,
      total: 218.5
    },
    {
      orderNo: "ORD017",
      price: 250.0,
      discountedPrice: 225.0,
      items: [
        { itemId: "I033", name: "Item 33", qty: 1 },
        { itemId: "I034", name: "Item 34", qty: 2 }
      ],
      purchaseDate: new Date("2025-01-17"),
      tax: 12.5,
      total: 237.5
    },
    {
      orderNo: "ORD018",
      price: 270.0,
      discountedPrice: 243.0,
      items: [
        { itemId: "I035", name: "Item 35", qty: 3 },
        { itemId: "I036", name: "Item 36", qty: 1 }
      ],
      purchaseDate: new Date("2025-01-18"),
      tax: 13.5,
      total: 256.5
    },
    {
      orderNo: "ORD019",
      price: 290.0,
      discountedPrice: 261.0,
      items: [
        { itemId: "I037", name: "Item 37", qty: 2 },
        { itemId: "I038", name: "Item 38", qty: 1 }
      ],
      purchaseDate: new Date("2025-01-19"),
      tax: 14.5,
      total: 275.5
    },
    {
      orderNo: "ORD020",
      price: 310.0,
      discountedPrice: 279.0,
      items: [
        { itemId: "I039", name: "Item 39", qty: 1 },
        { itemId: "I040", name: "Item 40", qty: 3 }
      ],
      purchaseDate: new Date("2025-01-20"),
      tax: 15.5,
      total: 294.5
    }
  ];

  const res = db.collection("sales").insertMany(salesRecords);
  console.log(res);

