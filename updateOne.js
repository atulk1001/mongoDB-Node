const DBConnection = require("./mongoClientv2");

async function update() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");
  const res = await db
    .collection("category")
    .updateOne({ name: "Water" }, { $set: { name: "Drinking Water" } });
  console.log(res);
}

update();
