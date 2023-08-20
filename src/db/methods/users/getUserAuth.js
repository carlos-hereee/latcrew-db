const Users = require("../../schema/user");

module.exports = async ({ username, refreshToken }) => {
  if (username) {
    return await Users.findOne({ username }).select("+salt +password");
  }
  if (refreshToken) {
    return await Users.findOne({ refreshToken });
  }
};
