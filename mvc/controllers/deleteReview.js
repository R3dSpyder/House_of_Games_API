const removeReview = require("../models/removeReview.js");

const deleteReview = async (req, res, next) => {
  try {
    const response = await removeReview(req.params.review_id);
    if (response) {
      res.status(200).send();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteReview;
