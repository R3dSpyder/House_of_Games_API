const db = require("../../db/connection.js").default;

//  GET: should have categories- references categories.slug, owner references users.username, comments.review_id primary key,
// reviews.title, reviews.review_body, reviews.designer, reviews.review_image_url, reviews.votes, reviews.created_at
const fetchReviewObjectById = async (id) => {
  try {
    const checkReviewIdExists = await db.query(
      "SELECT * FROM reviews WHERE review_id =$1;",
      [id]
    );

    if (checkReviewIdExists.rows.length === 0) {
      throw { status: 400, msg: "that review ID is not found." };
    } else {
      const getReviewObject = await db.query(
        "SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id WHERE REVIEWS.review_id =$1 GROUP BY reviews.review_id;",
        [id]
      );
      return getReviewObject.rows;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = fetchReviewObjectById;
