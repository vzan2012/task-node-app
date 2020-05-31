const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// New Router for User
app.use(userRouter);
// New Router for Task
app.use(taskRouter);

// const router = new express.Router();

// router.get("/tests", (req, res) => res.send("Another new router"));
// app.use(router);

// Example Testing the bcryptjs
const bcryptjs = require("bcryptjs");
const testFunc = async () => {
  const password = "SS_admin@123";
  const hashedPassword = await bcryptjs.hash(password, 9);

  console.log(`Password: ${password}`);
  console.log(`Hashed Password: ${hashedPassword}`);

  const isMatch = await bcryptjs.compare("SS_admin@123", hashedPassword);
  console.log(isMatch);
};

testFunc();

app.listen(port, () => console.log(`Server running on port ${port}`));
