module.exports = async (req, res) => {
  try {
    const user = await getUser({ userId: req.params.userId });
    res.status(200).send(user);
  } catch (error) {
    if (isDev) console.log("error", error);
    res.status(400).send(msg.userDoesNotExist);
  }
};
