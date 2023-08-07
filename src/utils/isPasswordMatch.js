const bcrypt = require("bcryptjs");
const msg = require("../data/error.message.json");

module.exports = (password, hashPassword) => {
  if (!hashPassword) {
    return {
      error: { status: 404, message: msg.hashPasswordNotIncluded },
    };
  }
  const comparePassword = bcrypt.compareSync(password, hashPassword);
  if (!comparePassword) {
    return { error: { status: 400, message: msg.invalidEmailOrPassword } };
  }
  return { isMatch: true };
};
