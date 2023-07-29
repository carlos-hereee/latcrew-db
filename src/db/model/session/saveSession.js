const { v4 } = require("uuid");
const Session = require("../../schema/session");

module.exports = async ({ email, username }) => {
  if (email) {
    return await Session.save({ uid: v4(), isValid: true, email });
  }
  if (username) {
    return await Session.save({ uid: v4(), isValid: true, username });
  }
};
