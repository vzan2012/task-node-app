const express = require("express");
const router = new express.Router();

const Task = require("../models/task");

// Task Endpoint
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }

  // task
  //   .save()
  //   .then(() => res.status(201).send(task))
  //   .catch((err) => res.status(400).send(err));
});

// Read Tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }

  // Older Code
  // Task.find({})
  //   .then((tasks) => res.send(tasks))
  //   .catch((e) => res.send(500));
});

// Read Task By ID
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
  // Older Code
  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) return res.status(404).send();
  //     res.send(task);
  //   })
  //   .catch((e) => res.status(500).send());
});

// Update Task by Id
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid Operations !!!" });
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete Task by Id
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
