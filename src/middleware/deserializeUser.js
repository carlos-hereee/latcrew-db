const getSession = require("../controllers/getSession");
const signJWT = require("../utils/signJWT");
const verifyJWT = require("../utils/verifyJWT");

module.exports = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) return next();
  const { payload: user, expired } = verifyJWT(accessToken);

  // Access token is valid
  if (user) {
    req.user = user;
    return next();
  }
  // check expired and refresh token is valid
  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };
  if (!refresh) return next();

  const session = getSession(refresh.sessionId);
  if (!session) return next();

  const newAccessToken = signJWT(session, "5s");
  res.cookie("accessToken", newAccessToken, { maxAge: 300000, httpOnly: true });
  req.user = verifyJWT(newAccessToken).payload;
  return next();
};
