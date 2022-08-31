const db = require("../../db/connection.js");

const removeReview = async (id) => {
  try {
    const checkReviewExists = await db.query(
      "SELECT 1 FROM reviews WHERE review_id=$1",
      [id]
    );
    if (checkReviewExists.rows.length > 0) {
      const deleteReview = await db.query(
        "DELETE FROM reviews WHERE review_id=$1 RETURNING *",
        [id]
      );
      if (deleteReview) {
        return deleteReview.rows;
      }
    } else {
      throw { status: 400, msg: "That review does not exist" };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = removeReview;
