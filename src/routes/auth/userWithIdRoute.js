module.exports = async (req, res) => {
  const user = await getUser({ userId: req.params.userId });
  if (user) res.status(200).json(user).end();
  else {
    const message = msg.userDoesNotExist;
    res.status(400).json(message).end();
  }
};
