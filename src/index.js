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

app.listen(port, () => console.log(`Server running on port ${port}`));
