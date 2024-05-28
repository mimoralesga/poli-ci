const express = require("express");
const router = express.Router();
const { getTodos, addTodo, completeTodo } = require("./services");

router.get("/", async (_, res) => {
  const tasks = await getTodos();

  res.json(tasks);
});

router.post("/", (req, res) => {
  const task = req.body;

  addTodo({
    ...task,
    done: false,
  });

  res.status(201).json(task);
});

router.post("/complete", async (req, res) => {
  const ids = req.body;
  const mapIds = ids.map((id) => [id]);

  await completeTodo(mapIds);

  res.status(204).json();
});

module.exports = router;
