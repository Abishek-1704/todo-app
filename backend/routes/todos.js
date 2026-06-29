const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../data/todos.json");

// Read todos
const readTodos = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");

    if (!data) return [];

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write todos
const writeTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};



// ======================
// GET ALL TODOS
// ======================

router.get("/", (req, res) => {
  const todos = readTodos();

  res.json(todos);
});



// ======================
// GET TODO BY ID
// ======================

router.get("/:id", (req, res) => {
  const todos = readTodos();

  const todo = todos.find(
    (t) => t.id === req.params.id
  );

  if (!todo) {
    return res.status(404).json({
      message: "Todo Not Found",
    });
  }

  res.json(todo);
});



// ======================
// CREATE TODO
// ======================

router.post("/", (req, res) => {
  const todos = readTodos();

  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and Description are required",
    });
  }

  const newTodo = {
    id: uuidv4(),
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.push(newTodo);

  writeTodos(todos);

  res.status(201).json(newTodo);
});



// ======================
// UPDATE TODO
// ======================

router.put("/:id", (req, res) => {
  const todos = readTodos();

  const index = todos.findIndex(
    (t) => t.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Todo Not Found",
    });
  }

  todos[index] = {
    ...todos[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  writeTodos(todos);

  res.json(todos[index]);
});



// ======================
// DELETE TODO
// ======================

router.delete("/:id", (req, res) => {
  const todos = readTodos();

  const filteredTodos = todos.filter(
    (t) => t.id !== req.params.id
  );

  writeTodos(filteredTodos);

  res.json({
    message: "Todo Deleted Successfully",
  });
});

module.exports = router;