const DBConnection = require("./mongoClientv2");

async function createUniqueIndex() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");
  const res = await db.collection("accounts").createIndex(
    { accountNumber: 1 },
    {
      unique: 1,
    }
  );
  console.log(res);
}

createUniqueIndex();
