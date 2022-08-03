const fetchCategories = require("../models/fetchCategories.js");

const getCategories = async (req, res, next) => {
  try {
    const response = await fetchCategories();
    if (response) {
      res.status(200).send(response);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getCategories;
