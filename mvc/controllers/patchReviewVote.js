const putReviewVote = require("../models/putReviewVote.js");

const patchReviewVote = async (req, res, next) => {
  if (req.body.inc_votes !== undefined && req.body.inc_votes !== null) {
    try {
      const patch = await putReviewVote(req.body, req.params.review_id);
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

module.exports = patchReviewVote;
