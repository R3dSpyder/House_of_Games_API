const fetchComments = require("../models/fetchComments.js");

const getComments = async (req, res, next) => {
  try {
    const response = await fetchComments(req.params.review_id);
    if (response) {
      res.status(200).send(response);
    }
  } catch (error) {
    next(error);
  }
};
module.exports = getComments;
