const mgs = require("../../data/error.message.json");

module.exports = (req, res, next) => {
  // check if user exists
  return req.user ? next() : res.status(403).send(mgs.userDoesNotExist);
};
