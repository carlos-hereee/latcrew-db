const msg = require("../../db/data/error.message.json");
const generateHash = require("../../utils/auth/generateHash");

module.exports = async (req, res, next) => {
  // use previous salt with password regenerate hash password
  const expectedHash = generateHash(req.user.salt, req.body.password);
  // validate password
  if (expectedHash === req.user.password) {
    return next();
  } else {
    const message = msg.invalidCredentails;
    return res.status(403).json(message).end();
  }
};
