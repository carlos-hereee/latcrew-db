const Users = require("../../schema/user");

module.exports = async (uid, isOnline) => {
  return await Users.updateOne({ uid }, { $set: { isOnline } });
};
