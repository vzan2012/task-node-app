const express = require("express");
const router = new express.Router();

// Middleware
const auth = require("../middleware/auth");

const Task = require("../models/task");
const User = require("../models/user");

// Task Endpoint
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read Tasks
// GET /tasks?completed-true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    const match = {};
    const sort = {};

    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Read Task By ID
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) return res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update Task by Id
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid Operations !!!" });
  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send();
    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete Task by Id
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
