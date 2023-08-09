module.exports = async (req, res) => {
  // router.post("/register", validateCredentials, async (req, res) => {
  const user = await saveUser(req.credentials);
  const session = await saveSession({ username: user.username });
  // console.log("user, session", user, session);
  const { accessToken } = storeCookies(res, user.username, session.uid);
  res.status(200).send({ user, accessToken });
  // });
};
