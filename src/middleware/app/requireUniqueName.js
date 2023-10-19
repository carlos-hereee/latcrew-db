const useGenericErrors = require("../../utils/auth/useGenericErrors");
const message = require("../../db/data/error.message.json");
const getApp = require("../../db/models/app/getApp");

module.exports = async (req, res, next) => {
  try {
    const appName = req.body.appName || req.params.appName;
    const app = await getApp({ appName });
    // if app is null appName is not taken
    if (!app) next();
    else res.status(400).json(message.appNameTaken).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured fetching appname data data");
  }
};
