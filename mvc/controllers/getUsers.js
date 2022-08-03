const fetchUsers = require("../models/fetchUsers.js");

const getUsers = async (req, res, next) => {
  try {
    const response = await fetchUsers();
    const formattedResponse = [...response];
    if (response) {
      res.status(200).send({ users: formattedResponse });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getUsers;
