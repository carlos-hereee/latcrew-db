module.exports = async (req, res) => {
  const updatedPassword = await updatePassword(req.credentials.uid, req.credentials);
  if (updatedPassword.acknowledged) return res.status(200).send(message.passwordChanged);
  else return res.status(500).send(msg.serverIsDown);
};
