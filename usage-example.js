const DBConnection = require("./mongoClientv2");

(async () => {
  const instance1 = new DBConnection();
  const client1 = await instance1.connect();
  const db1 = instance1.getDb("sample_mflix");
  const res1 = await db1.collection("users").countDocuments({});
  console.log(res1);

  const instance2 = new DBConnection();
  const client2 = await instance2.connect();
  const db2 = instance2.getDb("sample_mflix");
  const res2 = await db2.collection("users").countDocuments({});

  console.log(await res2);

  console.log(client1 === client2);
})();
