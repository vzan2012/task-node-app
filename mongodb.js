// CRUD - Create, Read, Update and Delete Operations

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();

// console.log(id);
// console.log(id.id.length);
// console.log(id.toHexString().length);
// console.log(id.getTimestamp());
// console.log(id.generationTime);

MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log("Unable to connect the Database");

    console.log("Connected Successfully !!!");

    const db = client.db(databaseName);

    // Fetch the data
    // db.collection("users").findOne({ _id: new ObjectID('5dd6a4b3e35c9e1460872b91') }, (error, user) => {
    //   if (error) return console.log("Unable to fetch the data");

    //   console.log(user)
    // });

    // Fetch the users based upon the age
    // db.collection("users")
    //   .find({ age: 34 })
    //   .toArray((error, user) => {
    //     console.log(user);
    //   });

    // For counting the records
    // db.collection("users")
    //   .find({ age: 34 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    db.collection("tasks").findOne(
      { _id: new ObjectID("5dde82c03a2e0b076823ea69") },
      (error, tasks) => {
        if (error) return console.log("Unable to fetch the data");

        console.log(tasks);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        console.log(tasks);
      });
  }
);
