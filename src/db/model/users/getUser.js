const Users = require("../../schema/user");

module.exports = async ({ username, email, uid }) => {
  if (uid) {
    return await Users.find({ uid });
  }
  if (email) {
    return await Users.find({ email });
  }
  if (username) {
    return await Users.find({ username });
  }
};
