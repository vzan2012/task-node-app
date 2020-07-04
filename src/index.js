const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

const port = process.env.PORT || 3000;

// Without Middleware:
//   new request -> run route handler

// With Middleware:
//   new request -> process required -> run route handler

// Middleware
// app.use((req, res, next) => {
//   // console.log(req.method, req.path);
//   // next();

//   // Example: Block GET requests
//   // if (req.method === "GET") {
//   //   res.send("GET requests are disabled");
//   // } else {
//   //   next();
//   // }
// });

// app.use((req, res, next) =>
//   res.status(500).send("Maintainence mode is running...")
// );

app.use(express.json());

// New Router for User
app.use(userRouter);
// New Router for Task
app.use(taskRouter);

// const router = new express.Router();

// router.get("/tests", (req, res) => res.send("Another new router"));
// app.use(router);

// Example Testing the bcryptjs
// const bcryptjs = require("bcryptjs");
// const testFunc = async () => {
//   const password = "SS_admin@123";
//   const hashedPassword = await bcryptjs.hash(password, 9);

//   console.log(`Password: ${password}`);
//   console.log(`Hashed Password: ${hashedPassword}`);

//   const isMatch = await bcryptjs.compare("SS_admin@123", hashedPassword);
//   console.log(isMatch);
// };

// testFunc();

// Example for testing JWT (JSON Web Tokens)
// const jwt = require("jsonwebtoken");
// const testFunc = async () => {
//   const token = jwt.sign(
//     { _id: "id@123" },
//     "I am a student for this class only",
//     { expiresIn: "10 seconds" }
//   );
//   console.log(token);

//   const data = jwt.verify(token, "I am a student for this class only");
//   console.log(data);
// };

// testFunc();

app.listen(port, () => console.log(`Server running on port ${port}`));

// const animal = {
//   name: "cat",
// };

// animal.toJSON = function () {
//   // console.log(this);
//   // return this;
//   return {};
// };

// // console.log(animal);
// console.log(JSON.stringify(animal));

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  //   const task = await Task.findById("5f005d3e9fff2d2a60afc41a");
  //   console.log(task);
  //   await task.populate("owner").execPopulate();
  //   console.log(task.owner);

  const user = await User.findById("5f00593ddd59be4328294010");
  //   console.log(user);
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

main();
