const db = require("../../db/connection.js");

const putVote = async ({ inc_votes }, id) => {
  try {
    const checkIDExists = await db.query(
      "SELECT 1 FROM reviews WHERE reviews.review_id = $1",
      [id]
    );

    if (checkIDExists.rows.length > 0) {
      const updateVote = await db.query(
        "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;",
        [inc_votes, id]
      );
      if (updateVote) {
        return updateVote.rows;
      }
    } else {
      throw {
        status: 400,
        msg: "that review ID is not found.",
      };
    }
  } catch (error) {
    throw error;
  }
};
module.exports = putVote;
