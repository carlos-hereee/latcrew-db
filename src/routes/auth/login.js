const getUser = require("../../db/models/users/getUser");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  // create new session cookie
  const { accessToken } = storeCookies(res, req.user.username, req.user.sessionId);
  const user = await getUser({ username: req.user.username });
  return res.status(200).json({ accessToken, user }).end();
};
