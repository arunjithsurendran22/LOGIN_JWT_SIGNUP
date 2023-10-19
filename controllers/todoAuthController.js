const Todo = require("../models/todos"); // Change 'Todos' to 'Todo'

// POST DATA FOR TODO
const todosPost = async (req, res) => {
    try {
      const { title } = req.body;
      console.log("Received data:", title);
      const todo = new Todo({ title });
      const savedTodo = await todo.save();
      console.log("Saved todo:", savedTodo);
      res.status(201).json(savedTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ error: "Error creating todo" });
    }
  };
  

// GET DATA FROM TODO
const todosGet = async (req, res) => {
  try {
    const todos = await Todo.find(); // Change 'Todos' to 'Todo'
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
};

// PUT
const todosPut = async (req, res) => {
  try {
    const todoId = req.params.id;
    const update = { title: req.body.title, completed: req.body.completed };

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, update); // Change 'Todos' to 'Todo'

    if (!updatedTodo) {
      res.status(404).send("Todo not found");
    } else {
      res.status(200).json(updatedTodo);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// DELETE
const todosDelete = async (req, res) => {
  try {
    const todoId = req.params.id;

    const deletedTodo = await Todo.findByIdAndRemove(todoId); // Change 'Todos' to 'Todo'

    if (!deletedTodo) {
      res.status(404).send("Todo not found");
    } else {
      res.status(204).send("Todo removed");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { todosPost, todosGet, todosPut, todosDelete };
