const putVote = require("../models/putVote.js");

const patchVote = async (req, res, next) => {
  if (req.body.inc_votes) {
    const patch = await putVote(req.body, req.params.review_id).catch((err) => {
      next(err);
    });

    if (patch) {
      res.status(202).send(patch);
    }
  } else {
    Promise.reject({
      status: 400,
      msg: "Bad request format to update vote",
    }).catch(next);
  }
};

module.exports = patchVote;
