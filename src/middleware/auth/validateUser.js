const getUserAuth = require("../../db/models/users/getUserAuth");

module.exports = async (req, res, next) => {
  const { username } = req.body;
  // must have a value
  if (!username) {
    const message = msg.missingCredentials;
    return res.status(400).json(message).end();
  }
  const user = await getUserAuth({ username });
  req.user = user;
  next();
};
