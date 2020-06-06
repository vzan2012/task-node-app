require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("5ec68ac7c3af6828601ebd49")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => console.log(result))
//   .catch((e) => console.log(`Error: ${e}`));

// Using ES6
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  return await Task.countDocuments({ completed: false });
};

deleteTaskAndCount("5ec6998f7ae7d623646adbf1")
  .then((count) => console.log(count))
  .catch((e) => console.log(`Error: ${e}`));
