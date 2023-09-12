const { Users } = require("../../schema/user");

module.exports = async ({ userId }, payload) => {
  return await Users.updateOne({ userId }, { $set: payload });
};
