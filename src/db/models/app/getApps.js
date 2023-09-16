const App = require("../../schema/app");

module.exports = async (ownerId) => {
  return await App.find({ ownerId });
};
