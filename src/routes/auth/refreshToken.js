const makeSession = require("../../utils/auth/makeSession");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const usePublicUserData = require("../../utils/auth/usePublicUserData");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  try {
    console.log("req.user", req.user);
    // require user
    if (!req.user) return res.status(404).json("User does not exists").end();
    // access granted: generate new sessionId
    const sessionId = makeSession(req.user.userId);
    req.user.auth.sessionId = sessionId;
    await req.user.save();
    // create  cookies
    const { accessToken } = storeCookies(res, req.user.username, sessionId);
    const user = usePublicUserData(req.user);
    res.status(200).json({ accessToken, user }).end();
  } catch (error) {
    useGenericErrors(error);
  }
};
