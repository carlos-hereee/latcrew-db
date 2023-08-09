const verifyJWT = require("../utils/jwt/verifyJWT");
const storeAccessToken = require("../utils/cookies/storeAccessToken");
const getValidSession = require("../db/methods/session/getValidSession");

module.exports = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) {
    // check expired and validate refresh token
    console.log(
      "**** Access token: MISSING \n\n**** Refresh token:",
      refreshToken ? "INCLUDED" : "MISSING"
    );
    const { payload, error } = verifyJWT(refreshToken);
    if (error.status === 403) {
      console.log("**** Error", error.message, "\n\n", "\tpayload: ", payload);
      return next();
    }
    // check session
    const [session] = await getValidSession({ uid: payload.sessionId });
    // if missing
    if (!session.uid) return next();
    // store new access token
    // const { accessToken } = storeAccessToken(res, session.username, session.sessionId);
    // req.user = verifyJWT(accessToken).payload;
    console.log("session", session);
    return next();
  }

  const { payload, error } = verifyJWT(accessToken);
  if (error) {
    console.log("error", error);
    return next();
  }
  // Access token is valid
  if (payload) {
    console.log("payload", payload);
    req.user = payload;
    return next();
  }
};
