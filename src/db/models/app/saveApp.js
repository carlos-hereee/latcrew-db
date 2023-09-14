const App = require("../../schema/app");

module.exports = async (payload) => {
  // const app = new App(payload);
  return await App.create(payload);
};
