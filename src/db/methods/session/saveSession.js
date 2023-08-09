const Session = require("../../schema/session");

module.exports = async (payload) => {
  const session = new Session(payload);
  return await session.save();
};
