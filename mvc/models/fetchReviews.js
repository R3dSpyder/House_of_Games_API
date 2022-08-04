const { RowDescriptionMessage } = require("pg-protocol/dist/messages.js");
const db = require("../../db/connection.js");

const fetchReviews = (
  id,
  { sort_by = "created_at", order = "DESC", category = "social deduction" }
) => {
  let query =
    "SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id=comments.review_Id GROUP BY reviews.review_id ";

  if (category) {
    query += `HAVING category='${category}'::text ORDER BY ${sort_by} ${order};`;
  } else {
    query += "";
  }

  return db.query(query).then(({ rows }) => {
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
