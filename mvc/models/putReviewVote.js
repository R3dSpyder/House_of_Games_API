const db = require("../../db/connection.js").default;

const putReviewVote = async ({ inc_votes }, id) => {
  try {
    const updateVote = await db.query(
      "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;",
      [inc_votes, id]
    );
    if (updateVote.rows.length > 0) {
      return updateVote.rows;
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

module.exports = putReviewVote;
