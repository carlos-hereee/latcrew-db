const getSession = require("../db/model/session/getSession");
const signJWT = require("../utils/signJWT");
const verifyJWT = require("../utils/verifyJWT");

module.exports = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) return next();
  const { payload: user, expired } = verifyJWT(accessToken);
  if (user) {
    // Access token is valid
    req.user = user;
    return next();
  }
  // check expired and refresh token is valid
  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };
  // console.log("refresh", refresh);
  if (!refresh) return next();
  const session = getSession(refresh.sessionId);
  if (!session) return next();
  const newAccessToken = signJWT(session, "5m");
  res.cookie("accessToken", newAccessToken, { maxAge: 300000, httpOnly: true });
  req.user = verifyJWT(newAccessToken).payload;
  return next();
};
