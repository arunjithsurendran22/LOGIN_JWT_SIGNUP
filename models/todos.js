const mongoose = require("mongoose");

//creating schema

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const todo = mongoose.model("todos", todoSchema);
module.exports = todo;
