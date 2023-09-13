const useGenericErrors = require("../../utils/auth/useGenericErrors");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  try {
    // made it through the forest, create new session cookie
    const sessionId = req.user.auth.sessionId;
    const { accessToken } = storeCookies(res, req.user.username, sessionId);
    return res.status(200).json(accessToken).end();
  } catch (error) {
    useGenericErrors(res, res);
  }
};
