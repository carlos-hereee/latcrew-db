const msg = require("../../db/data/error.message.json");

module.exports = (req, res, next) => {
  const message = msg.userDoesNotExist;
  // check if user exists
  return req.user ? next() : res.status(403).json(message).end();
};
