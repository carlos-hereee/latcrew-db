const getUserAuth = require("../../db/models/users/getUserAuth");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const verifyJWT = require("../../utils/jwt/verifyJWT");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const { accessToken, refreshToken } = req.cookies;
    const token = accessToken ? accessToken : refreshToken;
    // validate token
    const { username, sessionId, error } = verifyJWT(token);
    if (error.error) console.log("error  verifying JWT", error);
    if (username) req.user = await getUserAuth({ username });
    else if (sessionId) req.user = await getUserAuth({ sessionId });
    next();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
