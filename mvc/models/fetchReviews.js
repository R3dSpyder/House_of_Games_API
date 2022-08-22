const { RowDescriptionMessage } = require("pg-protocol/dist/messages.js");
const db = require("../../db/connection.js").default;

const fetchReviews = async (
  review_id,
  { sort_by = "created_at", order = "DESC", category = "social deduction" }
) => {
  let query =
    "SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id=comments.review_Id GROUP BY reviews.review_id ";

  if (category) {
    query += `HAVING category='${category}'::text ORDER BY ${sort_by} ${order};`;
  } else {
    query += "";
  }

  try {
    const checkReviews = await db.query(query);
    if (checkReviews.rows.length > 0) {
      return checkReviews.rows;
    } else {
      throw { status: 400, msg: "no reviews in the database" };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = fetchReviews;
