const generateValidUserData = require("../../utils/auth/generateValidUserData");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  // made it through the forest, create new session cookie
  const sessionId = req.user.auth.sessionId;
  const { accessToken } = storeCookies(res, req.user.username, sessionId);
  const user = generateValidUserData(req.user);
  return res.status(200).json({ accessToken, user }).end();
};
