const request = require("supertest");
const app = require("../src/app");

test("Should Signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Sai Shravan",
      email: "vzan2012sai@gmail.com",
      password: "",
    })
    .expect(201);
});
