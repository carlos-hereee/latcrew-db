const getValidSession = require("../db/methods/session/getValidSession");

module.exports = async (req, res, next) => {
  const sessions = await getValidSession({ username: req.user?.username });
  // verify session
  if (sessions.length >= 1) {
    const validSession = sessions.forEach((session) => {
      const sessionId = session.sessionId;
    });
    console.log("validSession", validSession);
  }
  next();
};
