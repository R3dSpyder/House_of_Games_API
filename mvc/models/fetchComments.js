const db = require("../../db/connection.js");

const fetchComments = (id) => {
  return db
    .query("SELECT * FROM comments WHERE review_id=$1", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return db
          .query("SELECT * FROM reviews WHERE reviews.review_id = $1", [id])
          .then(({ rows }) => {
            if (rows.length === 0) {
              return Promise.reject({ status: 400, msg: "ID does not exist" });
            } else {
              return [];
            }
          });
      }
      return rows;
    });
};

module.exports = fetchComments;
