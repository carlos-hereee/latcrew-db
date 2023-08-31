const verifyJWT = require("../utils/jwt/verifyJWT");
const getUser = require("../db/users/getUser");

module.exports = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken && refreshToken) {
    const { payload } = verifyJWT(refreshToken);
    if (payload) {
      req.user = await getUser({ sessionId: payload });
    }
  }
  if (accessToken) {
    const { payload } = verifyJWT(accessToken);
    // Access token is valid
    if (payload) {
      req.user = await getUser({ username: payload });
    }
  }
  // console.log("req.user", req.user);
  return next();
};
