const fetchReviewObjectById = require("../models/fetchReviewObject.js");

const getReviewObjectById = async (req, res, next) => {
  const response = await fetchReviewObjectById(
    req.params.review_id,
    next
  ).catch(next);
  return res.status(200).send(response);
};

module.exports = getReviewObjectById;
