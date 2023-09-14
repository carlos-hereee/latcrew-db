const { v4 } = require("uuid");
const saveApp = require("../../db/models/app/saveApp");
const { appPayload } = require("./helpers/appPayload");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    // key variables
    const languageId = req.user.languageId;
    const ownwerId = req.user.userId;
    const appName = req.body.appName;
    const appId = v4();
    // save app
    const payload = appPayload({ appId, ownwerId, languageId, appName });
    await saveApp(payload);
    // add user permissions
    req.user.ownedApps = [...req.user.ownedApps, appId];
    req.user.permissions = [...req.user.permissions, { appId, role: "admin" }];
    req.user.save();
    res.status(202).json(appId).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
