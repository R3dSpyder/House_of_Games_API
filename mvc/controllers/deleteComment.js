const removeComment = require("../models/removeComment.js");

const deleteComment = async (req, res, next) => {
  try {
    const response = await removeComment(req.params.comment_id);
    if (response) {
      res.status(200).send();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteComment;
