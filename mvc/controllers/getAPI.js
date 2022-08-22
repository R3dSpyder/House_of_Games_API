const fetchAPI = require("../models/fetchAPI.js");

const getAPI = async (req, res, next) => {
  try {
    const response = await fetchAPI();
    if (response) {
      res.status(200).send(JSON.stringify(response));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getAPI;
