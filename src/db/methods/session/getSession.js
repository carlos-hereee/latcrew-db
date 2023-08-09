const Session = require("../../schema/session");

module.exports = async ({ sessionId, email, username }) => {
  if (sessionId) {
    return await Session.find({ sessionId });
  }
  if (email) {
    return await Session.find({ email });
  }
  if (username) {
    return await Session.find({ username });
  }
};
