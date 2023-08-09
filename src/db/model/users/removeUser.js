const Users = require("../../schema/user");

module.exports = async ({ username, email, uid }) => {
  if (uid) {
    return await Users.deleteOne({ uid });
  }
  if (email) {
    return await Users.deleteOne({ email });
  }
  if (username) {
    return await Users.deleteOne({ username });
  }
};
