const msg = require("../data/error.message.json");
const getUser = require("../db/methods/users/getUser");

module.exports = async (req, res, next) => {
  const { username } = req.body;
  if (!username) return res.status(400).send(msg.missingCredentials);
  req.user = await getUser({ username });
  next();
};
