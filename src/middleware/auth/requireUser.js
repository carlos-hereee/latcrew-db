const msg = require("../../data/error.message.json");

module.exports = (req, res, next) => {
  const message = mgs.userDoesNotExist;
  // check if user exists
  return req.user ? next() : res.status(403).json(message).end();
};
