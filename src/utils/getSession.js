const getSession = require("../db/model/session/getSession");

module.exports = async (sessionId) => {
  const session = await getSession({ uid: sessionId });
  return session && session.isValid ? session : null;
};
