const App = require("../../schema/app");

module.exports = async ({ appId, appName, appIds }) => {
  if (appIds) {
    return await App.find(appIds);
  }
  if (appId) {
    return await App.findOne({ appId }).populate("menu.active menu.alternatives");
  }
  if (appName) {
    return await App.findOne({ appName }).populate("menu.active menu.alternatives");
  }
};
