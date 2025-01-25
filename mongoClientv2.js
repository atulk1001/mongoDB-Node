// MongoDB Connection Singleton
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://techie20th:Mongo124@mongodb-free-cluster.kao50.mongodb.net/?retryWrites=true&w=majority&appName=mongodb-free-cluster";

class DBConnection {
  static dbInstance;
  constructor() {
    if (DBConnection.dbInstance) {
      return DBConnection.dbInstance;
    }
    this.client = null;
    DBConnection.dbInstance = this;
  }
  async connect() {
    if (!this.client) {
      // Create a MongoClient with a MongoClientOptions object to set the Stable API version
      this.client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      await this.client.connect();
      console.log("A new MongoDB connection created !");
    } else {
      console.log("Reusing exiting connection !");
    }
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

module.exports = DBConnection;
