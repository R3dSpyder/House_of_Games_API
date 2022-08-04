const db = require("../../db/connection.js");

//  GET: should have categories- references categories.slug, owner references users.username, comments.review_id primary key,
// reviews.title, reviews.review_body, reviews.designer, reviews.review_image_url, reviews.votes, reviews.created_at
const fetchReviewObjectById = (id) => {
  return db
    .query(
      "SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id=comments.review_Id WHERE reviews.review_id =$1 GROUP BY reviews.review_id",
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "ID out of range" });
      }
      return rows[0];
    });
};

module.exports = fetchReviewObjectById;
