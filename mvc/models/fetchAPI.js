const db = require("../../db/connection.js").default;
const fs = require("fs").promises;

const fetchAPI = async () => {
  try {
    const readFile = await fs.readFile("endpoints.json", "utf-8");
    if (readFile.length > 0) {
      return readFile;
    } else {
      throw { status: 400, msg: "file not found" };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = fetchAPI;
