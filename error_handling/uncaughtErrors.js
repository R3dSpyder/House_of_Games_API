const uncaughtError = (err, req, res, next) => {
  let response = `An unknown error has occured. If there is an error code available, it is listed here: ${err.code}`;
  res.status(500).send(response);
};

module.exports = uncaughtError;
