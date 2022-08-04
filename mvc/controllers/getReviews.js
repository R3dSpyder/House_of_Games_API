const fetchReviews = require("../models/fetchReviews.js");

const getReviews = async (req, res, next) => {
  try {
    const response = await fetchReviews(req.params.review_id);
    if (response) {
      res.status(200).send(response);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getReviews;
