const DBConnection = require("./mongoClientv2");

async function deleteOne() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");
  const res = await db
    .collection("category")
    .deleteOne({ name: { $in: ["Wifi-Bill"] } });
  console.log(res);
}

deleteOne();
