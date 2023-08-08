const getValidSession = require("../db/model/session/getValidSession");

module.exports = async (req, res, next) => {
  try {
    const session = await getValidSession({ username: req.user.username });
    // verify session
    if (session.length >= 1) {
    }
    next();
  } catch (error) {
    console.log("error", error);
    next();
  }
};
