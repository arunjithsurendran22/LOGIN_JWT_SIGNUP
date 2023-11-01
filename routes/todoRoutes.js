// todoRoutes.js
const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authenticateUser = require("../JWT/authMiddleWare");

// Apply the authenticateUser middleware to secure the routes
router.get("/api/todos", authenticateUser, todoController.listTodos);
router.post("/api/todos", authenticateUser, todoController.createTodo);
router.put("/api/todos/:id", authenticateUser, todoController.updateTodo);
router.delete("/api/todos/:id", authenticateUser, todoController.deleteTodo);

module.exports = router;
