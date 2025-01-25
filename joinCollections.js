const DBConnection = require("./mongoClientv2");

async function expenseDetails() {
  const instance = new DBConnection();
  await instance.connect();
  const db = instance.getDb("finance");
  const view = db.collection("expenses").aggregate([
    {
      $lookup: {
        from: "category",
        localField: "catId",
        foreignField: "_id",
        as: "expenseDocs",
      },
    },
  ]);
  let res = await view.toArray();
  console.log(JSON.stringify(res));
  //   const res = await db
  //     .collection("category")
  //     .updateOne({ name: "Water" }, { $set: { name: "Drinking Water" } });
  //   console.log(res);
}

expenseDetails();
