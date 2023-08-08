const bcrypt = require("bcryptjs");

module.exports = (password, strength) => bcrypt.hashSync(password, strength);
