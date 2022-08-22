const fetchReviews = require("../models/fetchReviews.js");

const getReviews = async (req, res, next) => {
  try {
    console.log(req.query, "<<<<");
    const response = await fetchReviews(req.query);
    if (response) {
      res.status(200).send({ response: response });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getReviews;
