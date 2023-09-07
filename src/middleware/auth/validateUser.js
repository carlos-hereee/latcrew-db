const getUserAuth = require("../../db/models/users/getUserAuth");

module.exports = async (req, res, next) => {
  const user = await getUserAuth({ username: req.body.username });
  req.user = user;
  next();
};
