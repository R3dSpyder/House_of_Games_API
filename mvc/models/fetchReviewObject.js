const db = require("../../db/connection.js");

//  GET: should have categories- references categories.slug, owner references users.username, comments.review_id primary key,
// reviews.title, reviews.review_body, reviews.designer, reviews.review_image_url, reviews.votes, reviews.created_at
const fetchReviewObjectById = (id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id=$1", [id])
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({ status: 404, msg: "ID out of range" });
      }
      return rows[0];
    });
};

module.exports = fetchReviewObjectById;
