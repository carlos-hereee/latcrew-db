const Users = require("../schema/user");

module.exports = async (isOnline, _id) => {
  await Users.updateOne({ _id }, { $set: { isOnline } });
};
