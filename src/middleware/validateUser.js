const msg = require("../data/error.message.json");
const getUser = require("../db/model/users/getUser");

module.exports = async (req, res, next) => {
  const { username } = req.body;
  const [user] = await getUser({ username });
  // if user does not exists in db
  if (!user) return res.status(404).send(msg.userDoesNotExist);
  req.user = user;
  next();
};
