const bcrypt = require("bcryptjs");
const msg = require("../data/error.message.json");

module.exports = ({ password, hashedPassword }) => {
  if (!hashedPassword) {
    return {
      error: { status: 401, message: msg.hashPasswordNotIncluded },
    };
  }
  const comparePassword = bcrypt.compareSync(password, hashedPassword);
  if (!comparePassword) {
    return { error: { status: 403, message: msg.invalidEmailOrPassword } };
  }
  return { error: null };
};
