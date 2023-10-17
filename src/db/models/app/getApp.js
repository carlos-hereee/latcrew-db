const App = require("../../schema/app");

module.exports = async ({ appId, appName, appIds }) => {
  const includeData = "landing.cta landing.sections menu.active menu.alternatives";
  if (appIds) {
    return await App.find(appIds);
  }
  if (appId) {
    return await App.findOne({ appId }).populate(includeData);
  }
  if (appName) {
    return await App.findOne({ appName }).populate(includeData);
  }
};
