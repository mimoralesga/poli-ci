const express = require("express");
const router = express.Router();

let tasks = [
  {
    id: Date.now().toString(),
    title:
      "Trate de calcular la alimentación EXE, tal vez se indexará el píxel de varios bytes!",
    competed: false,
  },
];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const task = req.body;

  tasks.push({
    ...task,
    completed: false,
  });

  res.status(201).json(task);
});

router.post("/complete", (req, res) => {
  const ids = req.body;

  tasks = tasks.filter((task) => !ids.includes(task.id));

  res.status(204).json();
});

module.exports = router;
