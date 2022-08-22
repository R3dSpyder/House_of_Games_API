const db = require("../../db/connection.js").default;

const fetchCategories = async () => {
  try {
    const categories = await db.query(`SELECT * FROM categories`);

    if (categories.rows) {
      return categories.rows;
    }
  } catch (error) {
    throw new Error(400);
  }
};

module.exports = fetchCategories;
