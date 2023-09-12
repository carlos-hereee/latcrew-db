const { Users } = require("../../schema/user");

module.exports = async ({ username, email, userId, all, sessionId }) => {
  if (username) {
    return await Users.findOne({ username });
  }
  if (userId) {
    return await Users.findOne({ userId });
  }
  if (email) {
    return await Users.findOne({ email });
  }
  if (sessionId) {
    return await Users.findOne({ auth: { sessionId } });
  }
  if (all) {
    return await Users.find();
  }
};
