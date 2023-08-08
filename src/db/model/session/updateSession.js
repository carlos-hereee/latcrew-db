const Session = require("../../schema/session");

module.exports = async (uid, payload) => {
  return await Session.updateOne({ uid }, { $set: payload });
};
