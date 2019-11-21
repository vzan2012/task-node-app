// CRUD - Create, Read, Update and Delete Operations

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log("Unable to connect the Database");

    //   console.log('Connected Successfully !!!');

    const db = client.db(databaseName);

    db.collection("users").insertOne({
      name: "Deepak",
      age: 34
    });
  }
);
