const getCategories = require("./mvc/controllers/getCategories.js");
const categories = require("./routes/categories");
const reviews = require("./routes/reviews");
const getReviewObjectById = require("./mvc/controllers/getReviewObject");
const {
  customError,
  psqlError,
  uncaughtError,
} = require("./error_handling/index.js");

const express = require("express");
const app = express();

//routes
app.use("/api/categories", categories);
app.use("/api/reviews", reviews);

//error handling.
app.use(customError);
app.use(psqlError);
app.use(uncaughtError);

module.exports = { app: app };
