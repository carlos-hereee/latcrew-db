const getValidSession = require("../../db/methods/session/getValidSession");

module.exports = async (req, res, next) => {
  const { username } = req.user;
  if (username) {
    req.session = await getValidSession({ username });
  }
  next();
};
