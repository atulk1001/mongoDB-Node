const DBConnection = require("./mongoClientv2");

async function insertMany() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");
  const res = await db
    .collection("category")
    .insertMany([
      { name: "Wifi-Bill" },
      { name: "Milk" },
      { name: "Water" },
      { name: "House Rent" },
      { name: "House-Maintenance" },
    ]);
  console.log(res);
}

insertMany();
