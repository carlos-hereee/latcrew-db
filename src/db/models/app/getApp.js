const App = require("../../schema/app");

module.exports = async ({ appId, appName, appIds, ownerId }) => {
  const includeData = "landing.cta landing.sections menu.active menu.alternatives logo";
  if (appIds) {
    return await App.find(appIds).populate(includeData).exec();
  }
  if (ownerId) {
    console.log("ownerId", ownerId);
    return await App.find({ ownerId }).populate(includeData).exec();
  }
  if (appId) {
    return await App.findOne({ appId }).populate(includeData);
  }
  if (appName) {
    return await App.findOne({ appName }).populate(includeData);
  }
};
