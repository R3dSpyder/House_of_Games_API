const getAPI = require("../mvc/controllers/getAPI.js");
const db = require("../db/connection.js");
const express = require("express");
const router = express.Router();
const cors = require("cors");

const { application } = require("express");
const { app } = require("../main_app.js");
app.use(cors());
router.route("/").get(getAPI);

require("../error_handling/wrongPathErrors");

module.exports = router;
