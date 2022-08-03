const categories = require("./routes/categories");
const reviews = require("./routes/reviews");

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

//error handling.
app.use(customError);
app.use(psqlError);
app.use(uncaughtError);

module.exports = { app: app };
