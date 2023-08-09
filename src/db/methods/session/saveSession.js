const { v4 } = require("uuid");
const Session = require("../../schema/session");

module.exports = async ({ username }) => {
  const session = new Session({ sessionId: v4(), isValid: true, username });
  return await session.save();
};
