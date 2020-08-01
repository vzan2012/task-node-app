const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "vzan2012",
  email: "vzan2012@gmail.com",
  password: "asdfgf@123",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should Signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Sai Shravan",
      email: "vzan2012sai@gmail.com",
      password: "asdfgf@123",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
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
