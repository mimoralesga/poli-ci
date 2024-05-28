const express = require("express");
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;
const { router } = require("./todo");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use("/todos", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
