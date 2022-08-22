// Request body accepts:

// an object with the following properties:

// - owner which is the username from the users table
// - title
// - review_body
// - designer
// - category which is a category from the categories table
// Responds with:

// the newly added review, with all the above properties as well as:

// -  review_id
// -  votes
// -  created_at
// -  comment_count

const makeReview = require("../models/makeReview.js");

const postReview = (req, res, next) => {};

module.exports = postReview;
