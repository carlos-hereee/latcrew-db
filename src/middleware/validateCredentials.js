const { v4 } = require("uuid");
const getUser = require("../db/methods/users/getUser");
const msg = require("../data/error.message.json");
const { isDev } = require("../../config.env");
const removeUser = require("../db/methods/users/removeUser");
const hashPassword = require("../utils/hashPassword");

module.exports = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password) return res.sendStatus(400);
  const [user] = await getUser({ username });
  if (user) {
    if (isDev) {
      // delete user for dev env
      await removeUser({ username });
    } else return res.status(400).send(msg.userAlreadyExist);
  }
  req.credentials = {
    username,
    email,
    isOnline: true,
    nickname: username,
    password: hashPassword(password, 10),
    userId: v4(),
  };
  next();
};
