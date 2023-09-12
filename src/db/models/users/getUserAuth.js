const { Users } = require("../../schema/user");

module.exports = async ({ username, sessionId }) => {
  const selectOption = "+auth.salt +auth.password +auth.sessionId";
  if (username) {
    return await Users.findOne({ username }).select(selectOption);
  }
  if (sessionId) {
    return await Users.findOne({ "auth.sessionId": sessionId }).select(selectOption);
  }
};
