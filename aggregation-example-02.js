const DBConnection = require("./mongoClientv2");

async function accountByCategory() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");
  const accounts = db.collection("accounts");
  const pipeline = [
    { $match: { balance: { $gt: 700 }, accountType: "savings" } },
    {
      $sort: {
        balance: -1,
      },
    },
    {
      $project: {
        _id: -1,
        balance: 1,
        accountHolder: 1,
        accountNumber: 1,
        accountType: 1,
        balanceInDollars: { $divide: ["$balance", 80] },
      },
    },
  ];
  const res = accounts.aggregate(pipeline);
  console.log(await res.toArray());
}
accountByCategory();
