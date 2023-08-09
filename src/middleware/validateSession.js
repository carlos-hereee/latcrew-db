const getValidSession = require("../db/model/session/getValidSession");

module.exports = async (req, res, next) => {
  try {
    const sessions = await getValidSession({ username: req.user.username });
    // verify session
    if (sessions.length >= 1) {
      // const validSession =
      sessions.forEach((session) => {
        const sessionId = session.uid;
      });
      // console.log("validSession", validSession);
    }
    next();
  } catch (error) {
    console.log("error", error);
    next();
  }
};
