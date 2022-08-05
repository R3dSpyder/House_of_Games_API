const db = require("../../db/connection.js");

const fetchComments = async (id) => {
  try {
    const checkReviewIdExists = await db.query(
      "SELECT * FROM reviews WHERE review_id =$1;",
      [id]
    );

    if (checkReviewIdExists.rows.length === 0) {
      throw { status: 400, msg: "that review ID is not found." };
    } else {
      const getComments = await db.query(
        "SELECT * FROM comments WHERE review_id =$1;",
        [id]
      );
      return getComments.rows;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = fetchComments;
