const db = require("../../db/connection.js");

const makeComment = (username, body, id, created_at) => {
  return db
    .query("SELECT 1 FROM users WHERE username = $1", [username])

    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 400,
          msg: "user does not exist. Post aborted.",
        });
      }
      return db
        .query(
          "INSERT INTO comments (review_id, author, body,created_at) VALUES ($1, $2, $3, $4) RETURNING *;",
          [id, username, body, created_at]
        )
        .then(({ rows }) => {
          if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Table not found" });
          }
          return rows;
        });
    });
};

module.exports = makeComment;
