const { v4 } = require("uuid");
const getUser = require("../db/model/users/getUser");
const bcrypt = require("bcryptjs");
const msg = require("../data/error.message.json");

module.exports = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await getUser({ username, email });
  if (user) {
    res.status(400).send(msg.userAlreadyExist);
  } else {
    req.credentials = {
      username,
      email,
      password,
      nickname: username,
      hashPassword: bcrypt.hashSync(password, 14),
      uid: v4(),
      isOnline: true,
    };
    next();
  }
};
