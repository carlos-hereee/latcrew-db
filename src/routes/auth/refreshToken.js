const makeSession = require("../../utils/auth/makeSession");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  console.log("req.user", req.user);
  const payload = { user: {}, accessToken: "", language: {} };
  // access granted: generate new sessionId
  const sessionId = makeSession(req.user.userId);
  req.user.sessionId = sessionId;
  await req.user.save();
  // create  cookies
  const { accessToken } = storeCookies(res, req.user.username, sessionId);
  payload.accessToken = accessToken;
  payload.user = req.user;
  payload.language = req.user.language;
  return res.status(200).json(payload).end();
};
