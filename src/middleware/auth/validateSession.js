const getValidSession = require("../../db/methods/session/getValidSession");

module.exports = async (req, res, next) => {
  const username = req.user?.username;
  if (username) {
    const session = await getValidSession({ username });
    req.session = session;
  }
  next();
};
