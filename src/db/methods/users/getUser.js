const Users = require("../../schema/user");

module.exports = async ({ username, email, userId, all, sessionToken }) => {
  if (username) {
    return await Users.findOne({ username });
  }
  if (userId) {
    return await Users.findOne({ userId });
  }
  if (email) {
    return await Users.findOne({ email });
  }
  if (sessionToken) {
    return await Users.findOne({ "authentication.sessionToken": sessionToken });
  }
  if (all) {
    return await Users.find();
  }
};
