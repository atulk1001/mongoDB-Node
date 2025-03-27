const DBConnection = require("./mongoClientv2");

async function accountByCategory() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");
  const accounts = db.collection("accounts");
  const pipeline = [
    {},
    {
      $group: {
        _id: "$accountType",
        total_bal: { $sum: "$balance" },
      },
    },
  ];
  const res = accounts.aggregate(pipeline);
  console.log(await res.toArray());
}
accountByCategory();
