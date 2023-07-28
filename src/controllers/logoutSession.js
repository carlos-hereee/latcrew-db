module.exports = async (req, res) => {
  const { user } = req;
  const session = invalidateSession(user.sessionId);
  // reset cookies
  res.cookie("accessToken", "", { maxAge: 0, httpOnly: true });
  res.cookie("refreshToken", "", { maxAge: 0, httpOnly: true });
  return res.send(session);
};
