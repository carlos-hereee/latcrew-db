const { Users } = require("../../schema/user");

module.exports = async ({ username }) => {
  if (username) {
    return await Users.findOne({ auth: { username } }).select(
      "+auth.salt +auth.password"
    );
  }
  // if (refreshToken) {
  //   return await Users.findOne({ auth: { sessionId: refreshToken } });
  // }
};
