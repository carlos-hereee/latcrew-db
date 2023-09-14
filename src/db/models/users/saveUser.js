const { Users } = require("../../schema/users");

module.exports = async (payload) => {
  // const user = new Users(payload);
  return await Users.create(payload);
};
