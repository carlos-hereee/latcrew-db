const Users = require("../../schema/user");

module.exports = async ({ userId }) => {
  return await Users.deleteOne({ userId });
};
