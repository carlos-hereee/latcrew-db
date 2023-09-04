const saveUser = require("../../db/models/users/saveUser");
const storeCookies = require("../../utils/cookies/storeCookies");
const random = require("../../utils/auth/random");
const generateHash = require("../../utils/auth/generateHash");
const { v4 } = require("uuid");

module.exports = async (req, res) => {
  const { email, username } = req.body;
  // save protect password with hash-encryption
  const userId = v4();
  const salt = random();
  const password = generateHash(salt, req.body.password);
  const sessionId = generateHash(salt, userId);
  await saveUser({ userId, email, username, salt, password, sessionId });

  // create session cookie
  const { accessToken } = storeCookies(res, username, sessionId);
  return res.status(200).json({ accessToken, user: { username, userId, email } }).end();
};
