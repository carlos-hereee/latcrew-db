const App = require("../../schema/app");

module.exports = async ({ appId, calendarId, adminId }) => {
  if (adminId) {
    return await App.find({ adminId });
  }
  if (calendarId) {
    return await App.find({ calendarId });
  }
  if (appId) {
    return await App.find({ appId });
  }
};
