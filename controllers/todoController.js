// todoController.js
const Todo = require("../models/Todo");

// List all TODOs
const listTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.find({ user: userId });
    res.json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching TODOs" });
  }
};

// Create a new TODO
const createTodo = async (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task name is required" });
  }
  try {
    const userId = req.user.id;
    const newTodo = new Todo({ task, user: userId });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating a new TODO" });
  }
};

// Update TODO by ID
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task name is required" });
  }
  try {
    const userId = req.user.id;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: userId },
      { task },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "TODO not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the TODO" });
  }
};
// Delete TODO by ID
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = req.user.id;
    const deletedTodo = await Todo.findOneAndRemove({ _id: id, user: userId });
    if (!deletedTodo) {
      return res.status(404).json({ error: "TODO not found" });
    }
    res.json(deletedTodo);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the TODO" });
  }
};

module.exports = { listTodos, createTodo, updateTodo, deleteTodo };
