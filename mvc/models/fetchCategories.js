const db = require("../../db/connection.js");

const fetchCategories = () => {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    if (!rows) {
      return Promise.reject({
        status: 400,
        msg: "bad request. Table does not exist at that path",
      });
    }
    return rows;
  });
};

module.exports = fetchCategories;
