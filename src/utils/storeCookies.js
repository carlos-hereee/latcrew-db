const signJWT = require("./signJWT");

module.exports = (res, username, sessionId) => {
  const accessToken = signJWT({ username, sessionId }, "5s");
  const refreshToken = signJWT({ sessionId }, "90d");
  res.cookie("accessToken", accessToken, { maxAge: 300000, httpOnly: true });
  res.cookie("refreshToken", refreshToken, { maxAge: 3.154e10, httpOnly: true });
  return { accessToken };
};
