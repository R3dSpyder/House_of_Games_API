const uncaughtError = (err, req, res, next) => {
  let response = `An unknown error has occured. Here is the error string: ${err}`;
  res.status(500).send(response);
};

module.exports = uncaughtError;
