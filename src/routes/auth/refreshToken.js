const makeSession = require("../../utils/auth/makeSession");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  const payload = { user: {}, accessToken: "", language: {} };
  if (req.user) {
    // access granted: generate new sessionId
    const sessionId = makeSession(req.user.userId);
    req.user.sessionId = sessionId;
    await req.user.save();
    // create  cookies
    const { accessToken } = storeCookies(res, req.user.username, req.user.sessionId);
    payload.accessToken = accessToken;
    payload.user = req.user;
    payload.language = req.user.language;
    return res.status(200).json(payload).end();
  } else res.status(204).json(payload).end();
};
