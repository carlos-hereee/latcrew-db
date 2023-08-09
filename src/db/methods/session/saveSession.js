const { v4 } = require("uuid");
const Session = require("../../schema/session");

module.exports = async ({ email, username }) => {
  const session = new Session({
    uid: v4(),
    isValid: true,
    email: email ? email : username,
    username: username ? username : email,
  });
  return await session.save();
};
