const getUsers = require("../mvc/controllers/getUsers.js");
const getUser = require("../mvc/controllers/getUser.js");
const express = require("express");
const router = express.Router();

router.route("/").get(getUsers);

router.route("/:username").get(getUser);

//error handling on path
require("../error_handling/wrongPathErrors");

module.exports = router;
