const request = require("supertest");
const app = require("../src/app");

const Tasks = require("../src/models/task");

const {
  userOneId,
  userOne,
  setupDatabase,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
} = require("../tests/fixtures/db");

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

test("Retrive of tasks created by user", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test("Should not delete other user tasks", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Tasks.findById(taskOne._id);
  expect(task).not.toBeNull();
});
