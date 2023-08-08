const hashPassword = require("../utils/hashPassword");
const isPasswordMatch = require("../utils/isPasswordMatch");

module.exports = (req, res, next) => {
  const { hashedPassword, uid } = req.user;
  // verify previous password
  const { error } = isPasswordMatch({ password: oldPassword, hashedPassword });
  if (error.status === 401 && newPassword) {
    req.credentials = { username, hashedPassword: hashPassword(newPassword, 10), uid };
  }
  if (error.status === 403) {
    return res.status(error.status).send(error);
  }
  next();
};
