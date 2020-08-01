const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.json());

// New Router for User
app.use(userRouter);
// New Router for Task
app.use(taskRouter);

module.exports = app;
