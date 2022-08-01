const fetchCategories = require("../models/fetchCategories.js");

const getCategories = (req, res) => {
  return fetchCategories().then((categories) => {
    res.status("200").send(categories);
  });
};

module.exports = getCategories;
