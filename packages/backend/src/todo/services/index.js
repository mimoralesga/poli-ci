const { sql } = require("../../postgres/config");

async function getTodos() {
  const tasks = await sql`
    SELECT * FROM tasks WHERE "done" = false;
  `;

  return tasks;
}

async function addTodo(task) {
  const tasks = await sql`
    INSERT INTO Tasks (id, title, done) VALUES ${sql(task, "id", "title", "done")};
  `;

  return tasks;
}

async function completeTodo(ids) {
  const tasks = await sql`
    UPDATE tasks SET "done" = true FROM (VALUES ${sql(ids)}) AS update_data (id)
    WHERE tasks.id = update_data.id;
  `;

  return tasks;
}

module.exports = {
  addTodo,
  completeTodo,
  getTodos,
};
