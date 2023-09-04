const msg = require("../../data/error.message.json");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const message = msg.missingCredentials;
    return res.status(400).json(message).end();
  }
  next();
};
