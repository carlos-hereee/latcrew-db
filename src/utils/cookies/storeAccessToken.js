const signJWT = require("../signJWT");

module.exports = (res, username, sessionId) => {
  const accessToken = signJWT({ username, sessionId }, "5m");
  res.cookie("accessToken", accessToken, { maxAge: 300000, httpOnly: true });
  return { accessToken };
};
