const db = require("../../db/connection.js");

const fetchReviews = (id) => {
  return db
    .query(
      "SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id=comments.review_Id GROUP BY reviews.review_id"
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 400,
          msg: "Not found. No data",
        });
      }
      return rows;
    });
};

module.exports = fetchReviews;
