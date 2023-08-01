const getSession = require("../db/model/session/getSession");

module.exports = async (uid) => {
  const session = await getSession({ uid });
  if (session) {
    session.isValid = false;
  }
  console.log("invalidate session", session);
  return session;
};
