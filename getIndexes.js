const DBConnection = require("./mongoClientv2");
// in mongo shell we need to use getIndexes to get list of indexes
async function getIndexList() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");
  const res = await db.collection("accounts").listIndexes();
  console.log(await res.toArray());
  instance.close();
}

getIndexList();
