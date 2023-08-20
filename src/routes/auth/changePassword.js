module.exports = async (req, res) => {
  // change password
  // if (req.body.newPassword) {
  //   // if request has newPassword field hash newpassword
  //   req.user = { ...req.user, password: hashPassword(req.body.newPassword, 10) };
  // }

  const updatedPassword = await updatePassword(req.credentials.uid, req.credentials);
  if (updatedPassword.acknowledged) return res.status(200).send(message.passwordChanged);
  else return res.status(500).send(msg.serverIsDown);
};
