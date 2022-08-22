const db = require("../../db/connection.js");

const fetchUsers = async () => {
  try {
    const getUsers = await db.query(`SELECT * FROM users`);
    if (getUsers.rows.length > 0) {
      return getUsers.rows;
    } else {
      throw {
        status: 404,
        msg: "Not found. No users exist in the database.",
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = fetchUsers;
