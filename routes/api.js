const getAPI = require("../mvc/controllers/getAPI.js");
const db = require("../db/connection.js");
const express = require("express");
const router = express.Router();
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
const { application } = require("express");

router.route("/").get(getAPI);
// app.use(cookieParser()); //user preferences
// app.use(
//   session({
//     secret: "anystring",
//     saveUninitialized: true,
//     resave: true,
//     store: db,
//   })
// ); //secrets session
//error handling for path
require("../error_handling/wrongPathErrors");

module.exports = router;
