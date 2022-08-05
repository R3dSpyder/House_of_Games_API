const makeComment = require("../models/makeComment.js");

const postComment = async (req, res, next) => {
  const created_at = new Date()
    .toISOString()
    .replace(/T+/, " ")
    .replace(/Z+/, "");
  if (req.body.username && req.body.body) {
    try {
      const post = await makeComment(
        req.body.username,
        req.body.body,
        req.params.review_id,
        created_at
      );
      if (post) {
        res.status(201).send({ post: post[0] });
      }
    } catch (error) {
      next(error);
    }
  } else {
    Promise.reject({
      status: 400,
      msg: "Poorly formatted request to POST comment.",
    }).catch(next);
  }
};

module.exports = postComment;
