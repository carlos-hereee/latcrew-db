const Calendar = require("../../schema/calendar");

module.exports = async ({ appId, languageId }) => {
  if (languageId) {
    return await Calendar.find({ appId, languageId });
  }
  if (appId) {
    return await Calendar.find({ appId });
  }
};
