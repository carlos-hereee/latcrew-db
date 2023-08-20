const saveUser = require("../../db/users/saveUser");
const storeCookies = require("../../utils/cookies/storeCookies");
const makeSession = require("../../utils/auth/makeSession");
const getUser = require("../../db/users/getUser");

module.exports = async (req, res) => {
  const { email, username, password } = req.body;
  // create session cookie
  const hashPassword = makeSession(password);
  const { accessToken } = storeCookies(res, username, hashPassword);
  await saveUser({ email, username, salt, password: hashPassword });

  const user = await getUser({ username });
  return res.status(200).send({ accessToken, user });
};
