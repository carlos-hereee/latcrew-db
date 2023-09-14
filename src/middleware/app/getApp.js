const getApp = require("../../db/models/app/getApp");

module.exports = async (req, res, next) => {
  const appId = req.user.ownedApps[0];
  req.app = await getApp({ appId });
  next();
};
