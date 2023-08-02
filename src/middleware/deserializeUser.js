const getSession = require("../db/model/session/getSession");
const signJWT = require("../utils/signJWT");
const verifyJWT = require("../utils/verifyJWT");

module.exports = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) {
    // check expired and refresh token is valid
    const { payload: refresh, expired } = verifyJWT(refreshToken);
    if (expired) return next();
    // check session
    const [session] = await getSession({ uid: refresh.sessionId });
    if (!session) return next();
    // create new access token
    const { uid, username } = session;
    const newAccessToken = signJWT({ username: username, sessionId: uid }, "5m");
    res.cookie("accessToken", newAccessToken, { maxAge: 300000, httpOnly: true });
    req.user = verifyJWT(newAccessToken).payload;
    return next();
  }
  const { payload: user, expired } = await verifyJWT(accessToken);
  console.log("expired", expired, user);
  // Access token is valid
  if (user) {
    req.user = user;
    return next();
  }
};
