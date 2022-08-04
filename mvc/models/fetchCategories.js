const db = require("../../db/connection.js");

const fetchCategories = () => {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "Not found. No data",
      });
    }
    return rows;
  });
};

module.exports = fetchCategories;
