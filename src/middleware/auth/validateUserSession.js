const generateHash = require("../../utils/auth/generateHash");
const random = require("../../utils/auth/random");

module.exports = async (res, req, next) => {
  const salt = random();
  const sessionId = generateHash(salt, req.user.userId);
  req.user.sessionId = sessionId;
  await req.user.save;
  next();
};
