const msg = require("../data/error.message.json");

module.exports = (password, hashedPassword) => {
  if (!hashedPassword) {
    return { error: { status: 401, message: msg.hashPasswordNotIncluded } };
  }
  const isMatching = bcrypt.compareSync(password, hashedPassword);
  if (!isMatching) {
    return { error: { status: 403, message: msg.invalidEmailOrPassword } };
  }
  return { error: null };
};
