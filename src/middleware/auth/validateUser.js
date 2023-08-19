const msg = require("../../data/error.message.json");
const getUserAuth = require("../../db/methods/users/getUserAuth");

module.exports = async (req, res, next) => {
  const { username } = req.body;
  if (!username) return res.status(400).send(msg.missingCredentials);
  const user = await getUserAuth({ username });
  req.user = user;
  next();
};
