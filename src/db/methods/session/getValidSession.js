const Session = require("../../schema/session");

module.exports = async ({ sessionId, email, username }) => {
  if (sessionId) {
    return await Session.findOne({ sessionId, isValid: true });
  }
  if (email) {
    return await Session.findOne({ email, isValid: true });
  }
  if (username) {
    return await Session.findOne({ username, isValid: true });
  }
};
