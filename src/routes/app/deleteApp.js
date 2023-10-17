const msg = require("../../db/data/error.message.json");

module.exports = (req, res) => {
  if (req.user.ownedApps.contains(req.app._id)) {
    console.log("match ", req.app);
  } else res.status(400).json(msg.unauthorizedUser);
};
