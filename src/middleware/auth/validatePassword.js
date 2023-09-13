const msg = require("../../db/data/error.message.json");
const generateHash = require("../../utils/auth/generateHash");

module.exports = async (req, res, next) => {
  // key variable
  const password = req.body.password ? req.body.password : req.body.oldPassword;
  // use previous salt with password regenerate hash password
  const expectedHash = generateHash(req.user.auth.salt, password);
  // validate password
  if (expectedHash === req.user.auth.password) {
    return next();
  } else {
    const message = msg.invalidCredentails;
    return res.status(403).json(message).end();
  }
};
