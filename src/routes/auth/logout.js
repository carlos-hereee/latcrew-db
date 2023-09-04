const resetCookies = require("../../utils/cookies/resetCookies");

module.exports = async (req, res) => {
  console.log("req.user", req.user);
  console.log("req.body", req.body);
  // invalidate session
  req.user.sessionId = "invalidated";
  await req.user.save();
  resetCookies(res);

  res.jsonStatus(202).end();

  //   changeOnline(false, req.user._id);
  // const session = invalidateSession(req.user.sessionId);
  // resetCookies(res); // reset cookies
  // res.json(session);
};
