const makeSession = require("../../utils/auth/makeSession");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  // access granted: generate new sessionId
  const sessionId = makeSession(req.user.userId);
  req.user.sessionId = sessionId;
  await req.user.save();
  // create  cookies
  const { accessToken } = storeCookies(res, req.user.username, req.user.sessionId);
  return res.status(200).json({ user: req.user, accessToken }).end();
};
