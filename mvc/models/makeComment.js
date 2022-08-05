const db = require("../../db/connection.js");

const makeComment = async (username, body, id, created_at) => {
  try {
    if (body) {
      const checkUserExists = await db.query(
        "SELECT 1 FROM users WHERE username = $1",
        [username]
      );
      if (checkUserExists.rows.length > 0) {
        const checkReviewIdExists = await db.query(
          "SELECT * FROM reviews WHERE review_id =$1;",
          [id]
        );
        if (checkReviewIdExists.rows.length > 0) {
          const makeComment = await db.query(
            "INSERT INTO comments (review_id, author, body,created_at) VALUES ($1, $2, $3, $4) RETURNING *;",
            [id, username, body, created_at]
          );
          return makeComment;
        } else {
          throw { status: 400, msg: "that review ID is not found." };
        }
      } else {
        throw {
          status: 400,
          msg: "user does not exist. Post aborted.",
        };
      }
    } else {
      throw { status: 400, msg: "No body to message" };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = makeComment;
