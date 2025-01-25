const DBConnection = require("./mongoClientv2");

async function insert() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");
  const res = await db.collection("category").insertOne({ name: "Petrol" });
  console.log(res);
}

insert();
