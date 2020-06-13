const express = require("express");
const User = require("../models/user");
const router = new express.Router();

// User Endpoint
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
  // Older code
  // user
  //   .save()
  //   .then(() => res.status(201).send(user))
  //   .catch((err) => res.status(400).send(err));
});

// User login - Endpoint
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });

    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

// Read Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }

  // Older Code
  // User.find({})
  //   .then((users) => res.send(users))
  //   .catch((e) => res.status(500).send());
});

// Read User By ID
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }

  // Older Code
  // User.findById(_id)
  //   .then((user) => {
  //     if (!user) return res.status(404).send();
  //     res.send(user);
  //   })
  //   .catch((e) => res.status(500).send());
});

// Update User by Id
router.patch("/users/:id", async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.findById(req.params.id);

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete User by Id
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
