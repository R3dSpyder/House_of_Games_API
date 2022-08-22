const psqlError = (err, req, res, next) => {
  console.log(err);
  let msg = "A SQL error has occured.";

  if (err.code) {
    res.status(400).send({ error: err.detail });
  } else {
    next(err);
  }
};

module.exports = psqlError;
