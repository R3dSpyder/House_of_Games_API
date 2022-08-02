const getCategories = require("../mvc/controllers/getCategories.js");
const express = require("express");
const router = express.Router();

router.route("/").get(getCategories);

//error handling for path
router
  .route("/*")
  .get((req, res) => {
    res.status(404).send({ msg: "Path Not Found." });
  })
  .post((req, res) => {
    res.status(404).send({ msg: "Permission denied! Cannot post there." });
  })
  .patch((req, res) => {
    res.status(404).send({
      msg: "Operation Aborted. There are no resources for you to amend here.",
    });
  });

module.exports = router;
