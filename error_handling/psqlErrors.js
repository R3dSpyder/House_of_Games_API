const psqlError = (err, req, res, next) => {
  const msg = "SQL error.";
  if (err.code) {
    switch (err.code) {
      case "22P02":
        msg += "Invalid input";
        break;
    }
    res.status(400).send({ error: msg });
  } else {
    next(err);
  }
};

module.exports = psqlError;
