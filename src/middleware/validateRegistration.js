const { v4 } = require("uuid");
const getUser = require("../db/model/users/getUser");
const bcrypt = require("bcryptjs");
const msg = require("../data/error.message.json");
const { isDev } = require("../../config.env");
const removeUser = require("../db/model/users/removeUser");

module.exports = async (req, res, next) => {
  const { username, email, password } = req.body;
  const [user] = await getUser({ username, email });
  if (user) {
    if (isDev) {
      // delete user for dev env
      const { acknowledged, deletedCount } = await removeUser({ username, email });
      console.log("removed", acknowledged, "deleted", deletedCount);
    } else return res.status(400).send(msg.userAlreadyExist);
  }
  req.credentials = {
    username: username || email,
    email: email || username,
    nickname: username || email,
    password,
    hashPassword: bcrypt.hashSync(password, 20),
    uid: v4(),
    isOnline: true,
  };
  next();
};
