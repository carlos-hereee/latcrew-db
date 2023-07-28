const getUser = require("../db/model/users/getUser");
const msg = require("../data/error.message.json");

module.exports = async (req, res) => {
  const { email, password, username } = req.body;
  const user = getUser({ email, username });
  if (!user || user.password !== password) {
    return res.status(401).send(msg.invalidEmailOrPassword);
  }

  const session = createSession(email || username);
  const accessToken = signJWT({ email, username, sessionId: session.sessionId }, "5s");
  const refreshToken = signJWT({ sessionId: session.sessionId }, "30d");
  // set access token cookie + refresh token cookie
  res.cookie("accessToken", accessToken, { maxAge: 300000, httpOnly: true });
  res.cookie("refreshToken", refreshToken, { maxAge: 3.15e10, httpOnly: true });
  return res.send(session);
};
