const App = require("../../schema/app");

module.exports = async (query) => {
  return await App.find({ appId: { $in: query } });
};
