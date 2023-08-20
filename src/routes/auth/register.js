const saveUser = require("../../db/methods/users/saveUser");
const generateHash = require("../../utils/auth/generateHash");
const msg = require("../../data/error.message.json");
const random = require("../../utils/auth/random");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  const { email, username, password } = req.body;
  if (req.user) return res.status(400).send(msg.userAlreadyExist);
  const salt = random();
  const hashPassword = generateHash(salt, password);
  const { accessToken } = storeCookies(res, username, hashPassword);
  const data = await saveUser({ email, username, salt, password: hashPassword });

  return res.status(200).send({
    accessToken,
    user: { userId: data.userId, username: data.username, email: data.email },
  });
};
