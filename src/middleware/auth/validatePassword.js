const mgs = require("../../data/error.message.json");
const generateHash = require("../../utils/auth/generateHash");

module.exports = async (req, res, next) => {
  const { password } = req.body;
  // verify previous password
  if (!req.user) return res.status(403).send(mgs.userDoesNotExist);
  // use previous salt with password regenerate hash password
  const expectedHash = generateHash(req.user.salt, password);
  // validate password
  if (expectedHash !== req.user.password) {
    return res.status(403).send(mgs.invalidCredentails);
  }
  return next();
};
