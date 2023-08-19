const Users = require("../../schema/user");

module.exports = async ({ username, sessionToken }) => {
  if (username) {
    const auth = "+authentication.salt +authentication.password";
    return await Users.findOne({ username }).select(auth);
  }
  if (sessionToken) {
    return await Users.findOne({ "authentication.sessionToken": sessionToken });
  }
};
