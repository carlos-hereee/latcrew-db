const msg = require("../../db/data/error.message.json");
// const successMessage = require("../../../db/data/success.message.json");
const successMessage = require("../../db/data/success.message.json");

module.exports = async (req, res) => {
  // change password
  // if (req.body.newPassword) {
  //   // if request has newPassword field hash newpassword
  //   req.user = { ...req.user, password: hashPassword(req.body.newPassword, 10) };
  // }

  const updatedPassword = await updatePassword(req.credentials.uid, req.credentials);
  if (updatedPassword.acknowledged) {
    const message = successMessage.passwordChanged;
    return res.status(200).json(message).end();
  } else {
    const message = msg.serverIsDown;
    return res.status(500).json(message).end();
  }
};
