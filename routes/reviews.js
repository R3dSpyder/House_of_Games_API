const getReviewObjectById = require("../mvc/controllers/getReviewObject.js");
const express = require("express");
const router = express.Router();

router.route("/:review_id").get(getReviewObjectById);

router
  .route("/*")
  .get((req, res) => {
    res
      .status(404)
      .send({ msg: "Path Not Found. You need to specify a valid ID" });
  })
  .post((req, res) => {
    res
      .status(404)
      .send({
        msg: "Cannot post there as Path Not Found. You need to specify a valid ID",
      });
  })
  .put((req, res) => {
    res
      .status(404)
      .send({
        msg: "Cannot ammend that resource. Not found. You need to specify a valid ID",
      });
  });

module.exports = router;
