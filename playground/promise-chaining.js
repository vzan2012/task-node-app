require("../src/db/mongoose");

const User = require("../src/models/user");

// User.findByIdAndUpdate("5ec68c197ae7d623646adbf0", { age: 36 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 36 });
//   })
//   .then((result) => console.log(result))
//   .catch((e) => console.log(`Error: ${e}`));

// Using ES6
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5ec68c197ae7d623646adbf0", 36)
  .then((count) => console.log(count))
  .catch((e) => console.log(`Error: ${e}`));
