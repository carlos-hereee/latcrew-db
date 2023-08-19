const hashPassword = require("../../utils/hashPassword");
const isPasswordMatch = require("../../utils/isPasswordMatch");
const msg = require("../../data/error.message.json");

module.exports = async (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).send(msg.missingCredentials);
  // verify previous password
  const { error } = isPasswordMatch({ password, hashedPassword: req.user?.password });
  if (!error) return next();
  // wrong password
  if (error.status === 403) return res.status(error.status).send(error);
  // password not hashed - low security
  if (error.status === 401 && req.body.newPassword) {
    // if request has newPassword field hash newpassword
    req.user = { ...req.user, password: hashPassword(req.body.newPassword, 10) };
  }
  return next();
};
