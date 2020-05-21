const express = require("express");
require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// User Endpoint
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.status(201).send(user))
    .catch((err) => res.status(400).send(err));
});

// Read Users
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((e) => res.status(500).send());
});

// Read User By ID
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) return res.status(404).send();
      res.send(user);
    })
    .catch((e) => res.status(500).send());
});

// Task Endpoint
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => res.status(201).send(task))
    .catch((err) => res.status(400).send(err));
});

// Read Tasks
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => res.send(tasks))
    .catch((e) => res.send(500));
});

// Read Task By ID
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) return res.status(404).send();
      res.send(task);
    })
    .catch((e) => res.status(500).send());
});

app.listen(port, () => console.log(`Server running on port ${port}`));