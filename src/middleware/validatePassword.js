const hashPassword = require("../utils/hashPassword");
const isPasswordMatch = require("../utils/isPasswordMatch");

module.exports = async (req, res, next) => {
  // verify previous password
  const { error } = isPasswordMatch({
    password: req.body.oldPassword ? req.body.oldPassword : req.body.password,
    hashedPassword: req.user.hashedPassword,
  });
  if (!error) return next();
  // wrong password
  if (error.status === 403) return res.status(error.status).send(error);
  // password not hashed - low security
  if (error.status === 401 && req.body.newPassword) {
    // if request has newPassword field hash newpassword
    req.user = { ...req.user, hashedPassword: hashPassword(req.body.newPassword, 10) };
  }
  return next();
};
