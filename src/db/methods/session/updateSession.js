const Session = require("../../schema/session");

module.exports = async ({ sessionId }, payload) => {
  return await Session.findOneAndUpdate({ sessionId }, { $set: payload });
};
