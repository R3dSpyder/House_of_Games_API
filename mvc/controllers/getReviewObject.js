const fetchReviewObjectById = require("../models/fetchReviewObject.js");

const getReviewObjectById = async (req, res, next) => {
  const response = await fetchReviewObjectById(req.params.review_id).catch(
    next
  );
  if (response) {
    res.status(200).send({ review: response });
  }
};

module.exports = getReviewObjectById;
