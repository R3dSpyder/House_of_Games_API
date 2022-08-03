const getUsers = require("../mvc/controllers/getUsers.js");
const express = require("express");
const router = express.Router();

router.route("/").get(getUsers);

//error handling on path
router
  .route("/*")
  .get((req, res) => {
    res.status(404).send({
      msg: "Not Found. That path has not been found.",
    });
  })
  .post((req, res) => {
    res.status(404).send({
      msg: "Cannot post there",
    });
  })
  .put((req, res) => {
    res.status(404).send({
      msg: "Cannot amend that resource",
    });
  });

module.exports = router;
