const getUsers = require("../mvc/controllers/getUsers.js");
const express = require("express");
const router = express.Router();

router.route("/").get(getUsers);

//error handling on path
require("../error_handling/wrongPathErrors");

module.exports = router;
