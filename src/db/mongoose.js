const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Creation of User
// const User = mongoose.model("User", {
//   name: {
//     type: String,
//   },
//   age: {
//     type: Number,
//   },
// });

// const myself = new User({
//   name: "vzan2012",
//   age: 36,
// });

// myself
//   .save()
//   .then(() => console.log(myself))
//   .catch((err) => console.log(`Error: ${err}`));

// Creation of Tasks
const Tasks = mongoose.model("Tasks", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const myTask = new Tasks({
  description: "Tea Break after 1 hour",
  completed: false,
});

myTask
  .save()
  .then(() => console.log(myTask))
  .catch((err) => console.log(`Error: ${err}`));
