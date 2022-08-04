const express = require("express");
const router = express.Router();

router
  .route("/*")
  .get((req, res) => {
    res.status(404).send({
      msg: "Not Found. That path has not been found.",
    });
  })
  .post((req, res) => {
    res.status(403).send({
      msg: "Permission Denied. Cannot post there.",
    });
  })
  .put((req, res) => {
    res.status(403).send({
      msg: "Permission Denied. Cannot amend that resource.",
    });
  });
