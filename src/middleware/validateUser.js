const msg = require("../data/error.message.json");
const getUser = require("../db/methods/users/getUser");

module.exports = async (req, res, next) => {
  const { username } = req.body;
  if (!username) return res.status(400).send(msg.missingCredentials);
  const user = await getUser({ username });
  // if user does not exists in db
  if (!user) return res.status(404).send(msg.userDoesNotExist);
  req.user = user;
  next();
};
