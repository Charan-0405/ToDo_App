const express = require("express");
const {
  addTodo,
  getTodos,
  deleteTodo,
} = require("../controllers/todoControllers");
const router = express.Router();
router.get("/get-todos", getTodos);
router.post("/add-todo", addTodo);
router.delete("/delete-todo", deleteTodo);
module.exports = router;
