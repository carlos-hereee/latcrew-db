const getUser = require("../../db/methods/users/getUser");

module.exports = async (req, res) => {
  // create new session cookie
  const { accessToken } = storeCookies(res, req.user.username, req.user.sessionId);
  const user = await getUser({ username: req.user.username });
  res.status(200).send({ accessToken, user });
};
