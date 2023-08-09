const Session = require("../../schema/session");

module.exports = async ({ uid, email, username }) => {
  try {
    if (uid) {
      return await Session.find({ uid, isValid: true });
    }
    if (email) {
      return await Session.find({ email, isValid: true });
    }
    if (username) {
      return await Session.find({ username, isValid: true });
    }
  } catch (error) {
    return error;
  }
};
