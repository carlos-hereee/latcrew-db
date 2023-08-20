const { v4 } = require("uuid");
const Users = require("../../schema/user");

module.exports = async (payload) => {
  const user = new Users({ ...payload, userId: v4() });
  return await user.save();
};
