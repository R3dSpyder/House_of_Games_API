const fetchReviewObjectById = require("../models/fetchReviewObject.js");

const getReviewObjectById = async (req, res, next) => {
  try {
    const response = await fetchReviewObjectById(req.params.review_id);

    if (response) {
      res.status(200).send({ review: response });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getReviewObjectById;
