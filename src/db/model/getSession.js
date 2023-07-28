const Session = require("../schema/session");

module.exports = async ({ uid, email }) => {
  if (uid) {
    return await Session.find({ uid });
  }
  if (email) {
    return await Session.find({ email });
  }
};
