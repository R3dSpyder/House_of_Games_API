const getReviewObjectById = require("../mvc/controllers/getReviewObject.js");
const getReviews = require("../mvc/controllers/getReviews.js");
const patchVote = require("../mvc/controllers/patchVote.js");
const express = require("express");
const router = express.Router();

router.route("/").get(getReviews);

router.route("/:review_id(\\d+)").get(getReviewObjectById).put(patchVote);

//error handling for path
router.route("/:review_id(\\D*)").get((req, res) => {
  res.status(404).send({
    msg: "Not Found. You need to specify a valid integer ID in format api/review/<integer_id>",
  });
});

//error handling for path
require("../error_handling/wrongPathErrors");

module.exports = router;
