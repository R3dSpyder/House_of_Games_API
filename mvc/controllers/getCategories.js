const fetchCategories = require("../models/fetchCategories.js");

const getCategories = async (req, res, next) => {
  const response = await fetchCategories().catch(next);
  res.status(200).send(response);
};

module.exports = getCategories;
