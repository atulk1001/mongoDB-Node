// $merge example
// $merge is a new aggregation stage that merges the results of the aggregation pipeline
// with an existing collection.
db.sales.insertMany([
  { _id: 1, product: "Laptop", quantity: 2, price: 800 },
  { _id: 2, product: "Phone", quantity: 5, price: 300 },
  { _id: 3, product: "Laptop", quantity: 3, price: 800 },
  { _id: 4, product: "Tablet", quantity: 4, price: 500 },
  { _id: 5, product: "Phone", quantity: 2, price: 300 },
  { _id: 6, product: "Laptop", quantity: 1, price: 800 },
]);

db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      totalQuantity: { $sum: "$quantity" },
      totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
    },
  },
  {
    $merge: {
      into: "monthlySales",
      on: "_id",
      whenMatched: "replace",
      whenNotMatched: "insert",
    },
  },
]);
