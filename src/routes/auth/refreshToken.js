module.exports = async (req, res) => {
  console.log("\n*** Req.user", req.user);
  const user = await getUser({ username: req.user.username });
  if (user) {
    const { accessToken } = storeCookies(res, user.username, req.user.sessionId);
    return res.status(200).send({ user, accessToken });
  }
  return res.status(400).send(msg.userDoesNotExist);
};
