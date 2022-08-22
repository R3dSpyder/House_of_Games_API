const db = require("../../db/connection.js").default;

const putCommentVote = async ({ inc_votes }, id) => {
  try {
    const updateVote = await db.query(
      "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;",
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

module.exports = putCommentVote;
