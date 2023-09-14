const { v4 } = require("uuid");
const saveApp = require("../../db/models/app/saveApp");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    // // save app
    // await saveApp(req.app);
    // // add to ownedApps
    // req.user.ownedApps = [...req.user.ownedApps, { appId }];
    // // add user permissions
    // req.user.permissions = [...req.user.permissions, { appId, role: "admin" }];
    // req.user.save();
    res.status(202).json(req.app.appId).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
