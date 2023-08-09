const Users = require("../../schema/user");

module.exports = async () => await Users.find();
