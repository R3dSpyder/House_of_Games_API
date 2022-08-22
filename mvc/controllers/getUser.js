const fetchUser = require("../models/fetchUser.js");

const getUser = async (req, res, next) => {
  try {
    const response = await fetchUser(req.params.username);
    if (response) {
      res.status(200).send({ user: response });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = getUser;
