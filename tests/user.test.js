const request = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../src/models/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "vzan2012",
  email: "vzan2012@gmail.com",
  password: "asdfgf@123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should Signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Sai Shravan",
      email: "vzan2012sai@gmail.com",
      password: "asdfgf@123",
    })
    .expect(201);

  // Assert the database changed successfully
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  // expect(response.body.user.name).toBe("Sai Shravan");
  expect(response.body).toMatchObject({
    user: {
      name: "Sai Shravan",
      email: "vzan2012sai@gmail.com",
    },
    token: user.tokens[0].token,
  });

  // Assertion for the plain text password
  expect(user.password).not.toBe("asdfgf@123");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);

  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login nonexistent users", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "vzan2029@gmail.com",
      password: userOne.password,
    })
    .expect(400);
});

test("Should get profile for the user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
