const msg = require("../../db/data/error.message.json");

module.exports = (req, res, next) => {
  // check if user exists
  const message = msg.userAlreadyExist;
  return req.user ? res.status(403).json(message).end() : next();
};
