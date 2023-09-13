const generateValidUserData = require("../../utils/auth/generateValidUserData");
const makeSession = require("../../utils/auth/makeSession");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  const payload = { user: {}, accessToken: "", language: {} };
  // access granted: generate new sessionId
  const sessionId = makeSession(req.user.userId);
  req.user.auth.sessionId = sessionId;
  await req.user.save();
  // create  cookies
  const { accessToken } = storeCookies(res, req.user.username, sessionId);
  payload.accessToken = accessToken;
  payload.user = generateValidUserData(req.user);
  return res.status(200).json(payload).end();
};
