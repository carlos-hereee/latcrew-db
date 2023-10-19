const removeApp = require("../../db/models/app/removeApp");

module.exports = async (req, res) => {
  const appId = req.params.appId;
  // if match remove from owned app
  const removeFromOwned = req.user.ownedApps.filter((data) => data.appId !== appId);
  req.user.ownedApps = removeFromOwned;
  await req.user.save();
  await removeApp({ appId });
  res.status(200).json(req.user).end();
};
