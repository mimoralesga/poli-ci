const postgres = require("postgres");

const sql = postgres("postgres://myuser:mypassword@database:5432/mydatabase");

module.exports = {
  sql,
};
