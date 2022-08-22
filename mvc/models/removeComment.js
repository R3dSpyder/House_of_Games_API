const db = require("../../db/connection.js").default;

const removeComment = async (id) => {
  console.log("triggered");
  try {
    const checkCommentExists = await db.query(
      "SELECT 1 FROM comments WHERE comment_id=$1",
      [id]
    );
    if (checkCommentExists.rows.length > 0) {
      const deleteComment = await db.query(
        "DELETE FROM comments WHERE comment_id=$1 RETURNING *",
        [id]
      );
      if (deleteComment) {
        return deleteComment.rows;
      }
    } else {
      throw { status: 400, msg: "That comment does not exist" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = removeComment;
