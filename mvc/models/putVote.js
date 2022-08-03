const db = require("../../db/connection.js");

const putVote = ({ inc_votes }, id) => {
  return db
    .query(
      "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;",
      [inc_votes, id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({ status: 404, msg: "ID out of range" });
      }
      return rows[0];
    });
};

module.exports = putVote;
