const { Users } = require("../../schema/user");

module.exports = async ({ username, email, userId, all, appId }) => {
  if (username) {
    return await Users.findOne({ username });
  }
  if (userId) {
    return await Users.findOne({ userId });
  }
  if (email) {
    return await Users.findOne({ email });
  }
  if (appId) {
    return await Users.find({ appId });
  }
  if (all) {
    return await Users.find();
  }
};
