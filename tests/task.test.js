const request = require("supertest");
const app = require("../src/app");

const Tasks = require("../src/models/task");

const { userOneId, userOne, setupDatabase } = require("../tests/fixtures/db");

beforeEach(setupDatabase);

test("Should create task for the user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "First Test Task",
    })
    .expect(201);

  const task = await Tasks.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});
