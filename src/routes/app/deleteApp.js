const msg = require("../../db/data/error.message.json");
const removeApp = require("../../db/models/app/removeApp");

module.exports = async (req, res) => {
  const appId = req.params.appId;
  const isMatch = req.user.ownedApps.filter((data) => data.appId === appId);
  if (isMatch.length > 0) {
    // if match remove from owned app
    const removeFromOwned = req.user.ownedApps.filter((data) => data.appId !== appId);
    req.user.ownedApps = removeFromOwned;
    await req.user.save();
    await removeApp({ appId });
    res.status(204).end();
  } else res.status(400).json(msg.unauthorizedUser);
};
