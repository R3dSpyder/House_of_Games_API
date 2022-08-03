const putVote = require("../models/putVote.js");

const patchVote = async (req, res, next) => {
  if (req.body.inc_votes) {
    try {
      const patch = await putVote(req.body, req.params.review_id);
      if (patch) {
        res.status(202).send(patch);
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

module.exports = patchVote;
