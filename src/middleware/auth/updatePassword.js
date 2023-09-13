const makeSession = require("../../utils/auth/makeSession");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    // update password and genereate new sessionId (should log everyone out)
    const sessionId = makeSession(req.user.userId);
    req.user.auth.sessionId = sessionId;
    // add old password to history
    req.user.auth.passwordHistory = req.user.auth.passwordHistory.push(
      req.user.auth.password
    );
    req.user.auth.password = generateHash(req.body.newPassword, 10);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
