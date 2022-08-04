const db = require("../../db/connection.js");

const fetchComments = (id) => {
  return db
    .query("SELECT * FROM comments WHERE review_id=$1", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 400,
          msg: "Not found. There are no comments with that review_id.",
        });
      }
      return rows;
    });
};

module.exports = fetchComments;
