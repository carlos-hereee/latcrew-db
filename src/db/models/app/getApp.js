const App = require("../../schema/app");

module.exports = async ({ appId }) => {
  if (appId) {
    return await App.findOne({ appId }).populate("menu.active menu.alternatives");
  }
};
