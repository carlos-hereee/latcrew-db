const Session = require("../../schema/session");

module.exports = async (payload) => {
  return await Session.save(payload);
};
