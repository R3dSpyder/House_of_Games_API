const db = require("../../db/connection.js");

const fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    if (!rows) {
      return Promise.reject({
        status: 404,
        msg: "Not found. No users exist in the database.",
      });
    }
    return rows;
  });
};

module.exports = fetchUsers;
