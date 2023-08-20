const msg = require("../../data/error.message.json");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send(msg.missingCredentials);
  next();
};
