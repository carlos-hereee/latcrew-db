const getUser = require("../../db/models/users/getUser");
const getUserAuth = require("../../db/models/users/getUserAuth");
const verifyJWT = require("../../utils/jwt/verifyJWT");

module.exports = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken && refreshToken) {
    // validate token
    const { payload } = verifyJWT(refreshToken);
    console.log("payload", payload);
    req.user = await getUserAuth({ sessionId: payload });
  }
  if (accessToken) {
    // validate token
    const { payload } = verifyJWT(accessToken);
    req.user = await getUser({ username: payload });
  }
  console.log("req.user", req.user);
  return next();
};
