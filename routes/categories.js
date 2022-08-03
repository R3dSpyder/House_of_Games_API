const getCategories = require("../mvc/controllers/getCategories.js");
const express = require("express");
const router = express.Router();

router.route("/").get(getCategories);

//error handling for path
require("../error_handling/wrongPathErrors");

module.exports = router;
