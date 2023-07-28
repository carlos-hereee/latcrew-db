const { v4 } = require("uuid");
const saveSession = require("../db/model/session/saveSession");

module.exports = async ({ email, username }) => {
  return await saveSession({ uid: v4(), email, username, isValid: true });
};
