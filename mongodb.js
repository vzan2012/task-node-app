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

    console.log("Connected Successfully !!!");

    const db = client.db(databaseName);

    // Insert a single document using the insertOne() method
    // db.collection("users").insertOne(
    //   {
    //     name: "ABCD",
    //     age: 50
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
    db.collection("tasks").insertMany(
      [
        {
          description: "Attend Class",
          completed: true
        },
        {
          description: "Prepare Soup",
          completed: true
        },
        {
          description: "Prepare Dinner",
          completed: false
        }
      ],
      (error, result) => {
        if (error) return console.log("Unable to insert multiple documents...");

        console.log(result.ops);
      }
    );
  }
);
