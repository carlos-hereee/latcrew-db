const App = require("../../schema/app");

module.exports = async ({ appId, appName }) => {
  if (appId) {
    return await App.findOne({ appId }).populate("menu.active menu.alternatives");
  }
  if (appName) {
    return await App.findOne({ appName }).populate("menu.active menu.alternatives");
  }
};
