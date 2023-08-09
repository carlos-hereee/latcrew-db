module.exports = async (req, res) => {
  const user = await getUser({ userId: req.params.userId });
  if (user) res.status(200).send(user);
  else res.status(400).send(msg.userDoesNotExist);
};
