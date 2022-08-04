const getReviewObjectById = require("../mvc/controllers/getReviewObject.js");
const getComments = require("../mvc/controllers/getComments.js");
const postComment = require("../mvc/controllers/postComment.js");
const getReviews = require("../mvc/controllers/getReviews.js");
const patchVote = require("../mvc/controllers/patchVote.js");
const express = require("express");
const router = express.Router();

router.route("/").get(getReviews);

router.route("/:review_id(\\d+)").get(getReviewObjectById).put(patchVote);

router.route("/:review_id(\\d+)/comments").get(getComments)
.post(postComment);

//error handling for path
router.route("/:review_id(\\D*)").get((req, res) => {
  res.status(404).send({
    msg: "Not Found. You need to specify a valid integer ID in format api/review/<integer_id>",
  });
});

router.route("/:review_id/comments").get();

//error handling for path
require("../error_handling/wrongPathErrors");

module.exports = router;
