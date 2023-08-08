const { v4 } = require("uuid");
const getUser = require("../db/model/users/getUser");
const msg = require("../data/error.message.json");
const { isDev } = require("../../config.env");
const removeUser = require("../db/model/users/removeUser");
const hashPassword = require("../utils/hashPassword");

module.exports = async (req, res, next) => {
  const { username, email, password } = req.body;
  const [user] = await getUser({ username, email });
  if (user) {
    if (isDev) {
      // delete user for dev env
      await removeUser({ username, email });
    } else return res.status(400).send(msg.userAlreadyExist);
  }
  req.credentials = {
    username: username || email,
    email: email || username,
    nickname: username || email,
    password,
    hashedPassword: hashPassword(password, 10),
    uid: v4(),
    isOnline: true,
  };
  next();
};
