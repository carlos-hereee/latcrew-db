const getUser = require("../../db/users/getUser");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  // create new session cookie
  const { accessToken } = storeCookies(res, req.user.username, req.user.sessionId);
  const user = await getUser({ username: req.user.username });
  return res.status(200).send({ accessToken, user });
};
