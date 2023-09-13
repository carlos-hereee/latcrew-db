const generateHash = require("../../utils/auth/generateHash");
const makeSession = require("../../utils/auth/makeSession");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  try {
    // key variables
    const { newPassword } = req.body;
    // update password and genereate new sessionId (should log everyone out)
    const sessionId = makeSession(req.user.userId);
    req.user.auth.sessionId = sessionId;
    req.user.auth.password = generateHash(newPassword, 10);
    await req.user.save();
    // create new cookies
    const { accessToken } = storeCookies(res, req.user.username, sessionId);
    // const user = generateValidUserData(req.user);
    res.status(200).json(accessToken).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
