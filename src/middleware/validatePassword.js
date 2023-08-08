const hashPassword = require("../utils/hashPassword");
const isPasswordMatch = require("../utils/isPasswordMatch");

module.exports = async (req, res, next) => {
  const { hashedPassword } = req.user;
  // verify previous password
  const { error } = isPasswordMatch({
    password: req.body.oldPassword ? req.body.oldPassword : req.body.password,
    hashedPassword,
  });
  if (!error) return next();
  if (error.status === 401 && newPassword) {
    req.user = { ...req.user, hashedPassword: hashPassword(newPassword, 10) };
    return next();
  }
  if (error.status === 403) {
    return res.status(error.status).send(error);
  }
};
