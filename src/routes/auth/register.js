const { v4 } = require("uuid");
const saveUser = require("../../db/methods/users/saveUser");
const generateHash = require("../../utils/auth/generateHash");
const msg = require("../../data/error.message.json");
const random = require("../../utils/auth/random");

module.exports = async (req, res) => {
  const { email, username, password } = req.body;
  if (req.user) return res.status(400).send(msg.userAlreadyExist);
  const salt = random();
  const user = await saveUser({
    userId: v4(),
    email,
    username,
    authentication: { salt, password: generateHash(salt, password) },
  });
  console.log("user", user);
  return res.status(200).send(user);
};
