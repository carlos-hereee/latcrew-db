const Users = require("../../schema/user");

module.exports = async ({ username, email, uid }) => {
  if (username) {
    return Users.deleteOne({ username });
  }
  if (uid) {
    return Users.deleteOne({ uid });
  }
  if (email) {
    return Users.deleteOne({ email });
  }
};
