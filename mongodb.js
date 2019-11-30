// CRUD - Create, Read, Update and Delete Operations

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();

console.log(id);
console.log(id.id.length);
console.log(id.toHexString().length);
console.log(id.getTimestamp());
console.log(id.generationTime);

MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log("Unable to connect the Database");

    console.log("Connected Successfully !!!");

    const db = client.db(databaseName);

    // Insert a single document using the insertOne() method
    // db.collection("users").insertOne(
    //   {
    //     name: "DeltaStar",
    //     age: 1000
    //   },
    //   (error, result) => {
    //     if (error) return console.log("Unable to insert the record");

    //     console.log(result.ops);
    //   }
    // );

    // Insert many documents using the insertMany() method
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Jen",
    //       age: 28
    //     },
    //     {
    //       name: "Gunther",
    //       age: 27
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) return console.log("Unable to insert many documents...");

    //     console.log(result.ops);
    //   }
    // );

    // Goal: Insert multiple tasks using insertMany() method
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Attend Class",
    //       completed: true
    //     },
    //     {
    //       description: "Prepare Soup",
    //       completed: true
    //     },
    //     {
    //       description: "Prepare Dinner",
    //       completed: false
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) return console.log("Unable to insert multiple documents...");

    //     console.log(result.ops);
    //   }
    // );
  }
);
