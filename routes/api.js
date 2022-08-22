const getAPI = require("../mvc/controllers/getAPI.js");
const db = require("../db/connection.js");
const express = require("express");
const router = express.Router();

router.route("/").get(getAPI);

require("../error_handling/wrongPathErrors");

module.exports = router;
