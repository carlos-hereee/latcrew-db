const bcrypt = require("bcryptjs");

module.exports = (password, hashPassword) => {
  if (!hashPassword) return { isMatch: false };
  return { isMatch: bcrypt.compareSync(password, hashPassword) };
};
