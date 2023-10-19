const express = require("express");
const todoController = require("../controllers/todoAuthController");
const router = express.Router();

router.post("/", todoController.todosPost);
router.get("/", todoController.todosGet);
router.put("/:id", todoController.todosPut);
router.delete("/:id", todoController.todosDelete);

module.exports = router;
