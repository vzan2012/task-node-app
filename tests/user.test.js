const request = require("supertest");
const app = require("../src/app");

const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("../tests/fixtures/db");

beforeEach(setupDatabase);

test("Should Signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "vzan2012_test",
      email: "vzan2012test@gmail.com",
      password: "asdfgf@1234",
    })
    .expect(201);

  // Assert the database changed successfully
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  // expect(response.body.user.name).toBe("Sai Shravan");
  expect(response.body).toMatchObject({
    user: {
      name: "vzan2012_test",
      email: "vzan2012test@gmail.com",
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

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/baby-elephant.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Emperor",
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Emperor");
});

test("Should not update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Paris",
    })
    .expect(400);
});
