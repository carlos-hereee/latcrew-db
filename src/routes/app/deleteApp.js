const msg = require("../../db/data/error.message.json");

module.exports = (req, res) => {
  const { appId } = req.body;
  console.log("appId", req.body);
  if (req.user.appId === appId) {
    console.log("match ", appId);
  } else res.status(400).json(msg.unauthorizedUser);
};
