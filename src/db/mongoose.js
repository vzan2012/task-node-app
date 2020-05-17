const mongoose = require("mongoose");
const validator = require("validator");

const connectionURL = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Creation of User
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is Invalid");
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error("Please give any word other than Password");
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age must be a +ve number");
    },
  },
});

// const myself = new User({
//   name: "               vzan2012",
//   email: "     VZAN2012@gmail.com",
//   password: "                    Pass9word",
// });

// myself
//   .save()
//   .then(() => console.log(myself))
//   .catch((err) => console.log(`Error: ${err}`));

// Creation of Tasks
const Tasks = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const myTask = new Tasks({
  description: "    Tea break at 4 or 5pm      ",
});

myTask
  .save()
  .then(() => console.log(myTask))
  .catch((err) => console.log(`Error: ${err}`));
