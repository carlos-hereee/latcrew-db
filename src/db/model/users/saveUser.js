const Users = require("../../schema/user");

module.exports = async (payload) => {
  return await Users.save(payload);
};
