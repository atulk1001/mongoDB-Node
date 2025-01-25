const DBConnection = require("./mongoClientv2");
// in mongo Shell we need to use explain() before the find()
async function explainQuery() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");
  const res = await db
    .collection("accounts")
    .find({ accountNumber: "ACC123456" })
    .explain();
  console.log(res.queryPlanner.winningPlan);
}

explainQuery();
