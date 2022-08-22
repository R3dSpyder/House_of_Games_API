const db = require("../../db/connection.js");

const fetchReviews = async ({
  sort_by = "created_at",
  order = "DESC",
  category = null,
}) => {
  let query =
    "SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id=comments.review_id GROUP BY reviews.review_id ";

  if (category !== null) {
    query += `HAVING category='${category}'::text ORDER BY ${sort_by} ${order};`;
  } else {
    query += `ORDER BY ${sort_by} ${order};`;
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
