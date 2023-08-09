const Users = require("../../schema/user");

module.exports = async (uid, payload) => {
  return await Users.updateOne({ uid }, { $set: payload });
};
