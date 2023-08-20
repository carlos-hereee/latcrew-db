const mgs = require("../../data/error.message.json");
const generateHash = require("../../utils/auth/generateHash");
const makeSession = require("../../utils/auth/makeSession");

module.exports = async (req, res, next) => {
  // use previous salt with password regenerate hash password
  const expectedHash = generateHash(req.user.salt, req.body.password);
  // validate password
  if (expectedHash === req.user.password) {
    // access granted: generate new sessionId
    const sessionId = makeSession(req.user.userId);
    req.user.sessionId = sessionId;
    await req.user.save();
    return next();
  } else return res.status(403).send(mgs.invalidCredentails);
};
