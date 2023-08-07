const Session = require("../../schema/session");

module.exports = async ({ uid, email, username }) => {
  try {
    if (uid) {
      return await Session.find({ uid });
    }
    if (email) {
      return await Session.find({ email });
    }
    if (username) {
      return await Session.find({ username });
    }
  } catch (error) {
    return error;
  }
};
