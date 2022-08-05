const deleteComment = require("../mvc/controllers/deleteComment.js");
const express = require("express");
const router = express.Router();

router.route("/:comment_id(\\d+)").delete(deleteComment);

//error handling for path
require("../error_handling/wrongPathErrors");

module.exports = router;
