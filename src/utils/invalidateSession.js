const getSession = require("./getSession");

module.exports = async (sessionId) => {
  const session = await getSession({ uid: sessionId });
  if (session) {
    session.isValid = false;
  }
  console.log("invalidate session", session);
  return session;
};
