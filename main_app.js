const express = require("express");
const app = express();
const getCategories = require("./mvc/controllers/getCategories.js");
app.use(express.json());

// returns an array of category objects with slug and description properties
app.get("/api/categories", getCategories);

const server = app.listen(9090, () => {
  console.log("..::server is now online and listening at port 9090::..");
});

module.exports = { app, server };
