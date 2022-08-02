const getReviewObjectById = require("../mvc/controllers/getReviewObject.js");
const express = require("express");
const router = express.Router();

router.route("/:review_id(\\d+)").get(getReviewObjectById);

//error handling for path
router.route("/:review_id(\\D*)").get((req, res) => {
  res.status(404).send({
    msg: "Not Found. You need to specify a valid integer ID in format api/review/<integer_id>",
  });
});

router.route("/:unspecified/:newnspecified").get((req, res) => {
  res.status(404).send({
    msg: "Not Found. That path has not been found.",
  });
});

router
  .route("/*")
  .get((req, res) => {
    res.status(404).send({
      msg: "Not Found. That path has not been found.",
    });
  })
  .post((req, res) => {
    res.status(404).send({
      msg: "Cannot post there as Path Not Found. You need to specify a valid ID",
    });
  })
  .put((req, res) => {
    res.status(404).send({
      msg: "Cannot ammend that resource. Not found. You need to specify a valid ID",
    });
  });

module.exports = router;
