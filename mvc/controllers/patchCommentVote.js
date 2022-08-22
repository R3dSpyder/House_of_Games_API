const putCommentVote = require("../models/putCommentVote.js");

const patchCommentVote = async (req, res, next) => {
  if (req.body.inc_votes) {
    try {
      const patch = await putCommentVote(req.body, req.params.comment_id);
      if (patch) {
        res.status(200).send(patch[0]);
      }
    } catch (error) {
      next(error);
    }
  } else {
    Promise.reject({
      status: 400,
      msg: "Bad request format to update vote",
    }).catch(next);
  }
};

module.exports = patchCommentVote;
