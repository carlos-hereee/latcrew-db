const Users = require("../schema/user");

module.exports = async (payload) => {
  const user = new Users(payload);
  return await user.save();
};
