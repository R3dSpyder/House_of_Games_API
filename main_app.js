const categories = require("./routes/categories");
const reviews = require("./routes/reviews");
const users = require("./routes/users");
const comments = require("./routes/comments");
const api = require("./routes/api");

const {
  customError,
  psqlError,
  uncaughtError,
} = require("./error_handling/index.js");

const express = require("express");
const app = express();
app.use(express.json());

//routes
app.use("/api/categories", categories);
app.use("/api/reviews", reviews);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api", api);

//error handling.
app.use(customError);
app.use(psqlError);
app.use(uncaughtError);

module.exports = { app: app };
