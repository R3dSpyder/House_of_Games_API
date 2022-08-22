const db = require("../../db/connection.js");
const fetchUser = async (username) => {
  try {
    const getUser = await db.query(
      `SELECT username, name, avatar_url FROM users WHERE username= $1`,
      [username]
    );
    if (getUser.rows.length > 0) {
      return getUser.rows;
    } else {
      throw {
        status: 404,
        msg: "Not found. No users by that name exist in the database.",
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = fetchUser;
