const saveUser = require("../../db/users/saveUser");
const storeCookies = require("../../utils/cookies/storeCookies");
const makeSession = require("../../utils/auth/makeSession");
const getUser = require("../../db/users/getUser");

module.exports = async (req, res) => {
  const { email, username } = req.body;
  // create session cookie
  const password = makeSession(req.body.password);
  const { accessToken } = storeCookies(res, username, password);
  await saveUser({ email, username, salt, password });

  const user = await getUser({ username });
  return res.status(200).send({ accessToken, user });
};
