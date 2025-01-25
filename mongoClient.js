const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://techie20th:Mongo124@mongodb-free-cluster.kao50.mongodb.net/?retryWrites=true&w=majority&appName=mongodb-free-cluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DBConnection {
  constructor() {
    this.client = null;
  }
  async connect() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await this.client.connect();
    console.log("A new MongoDB connection created");
    return this.client;
  }
  getDb(dbName) {
    if (!this.client) {
      throw new Error("Failed to initialize MongoDb Client!");
    }
    return this.client.db(dbName);
  }
  close() {
    if (this.client) {
      this.client.close();
      this.client = null;
      console.log("MongoDB connection closed");
    }
  }
}

// usage
(async () => {
  const instance1 = new DBConnection();
  const client1 = await instance1.connect();
  const db1 = instance1.getDb("sample_mflix");
  const res1 = await db1.collection("users").find({});
  console.log(await res1.toArray());

  const instance2 = new DBConnection();
  const client2 = await instance2.connect();
  const db2 = instance2.getDb("sample_mflix");
  const res2 = await db2.collection("users").find({});

  console.log(await res2.toArray());

  console.log(client1 === client2);
})();
