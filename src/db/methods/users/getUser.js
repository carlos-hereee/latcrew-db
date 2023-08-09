const Users = require("../../schema/user");

module.exports = async ({ username, email, userId, all }) => {
  if (userId) {
    return await Users.findOne({ userId });
  }
  if (email) {
    return await Users.findOne({ email });
  }
  if (username) {
    return await Users.findOne({ username });
  }
  if (all) {
    return await Users.find();
  }
};
