const router = require("express").Router();
const validateRegistration = require("../middleware/validateRegistration");
const requireUser = require("../middleware/requireUser");
const invalidateSession = require("../utils/invalidateSession");
const getUser = require("../db/model/users/getUser");
const isPasswordMatch = require("../utils/isPasswordMatch");
const msg = require("../data/error.message.json");
const saveSession = require("../db/model/session/saveSession");
const storeCookies = require("../utils/cookies/storeCookies");
const resetCookies = require("../utils/cookies/resetCookies");
const saveUser = require("../db/model/users/saveUser");
const { isDev } = require("../../config.env");

router.get("/", requireUser, async (req, res) => {
  res.status(200).send(req.user);
});
router.get("/:uid", requireUser, async (req, res) => {
  try {
    const user = await getUser({ uid: req.params.uid });
    res.status(200).send(user);
  } catch (error) {
    if (isDev) console.log("error", error);
    res.status(400).send(msg.userDoesNotExist);
  }
});
router.post("/register", validateRegistration, async (req, res) => {
  const user = await saveUser(req.credentials);
  const session = await saveSession({ username: user.username });
  // console.log("user, session", user, session);
  const { accessToken } = storeCookies(res, user.username, session.uid);
  res.status(200).send({ user, accessToken });
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const [user] = await getUser({ username });
  if (!user) {
    return res.status(404).send(msg.userDoesNotExist);
  }
  // check if passwords match
  const { error } = isPasswordMatch(password, user.password);
  if (error) {
    return res.status(error.status).send(error);
  }
  const session = await saveSession({ username });
  const { accessToken } = storeCookies(res, username, session.uid);
  return res.status(200).send({ user, accessToken });
});
router.post("/refresh-token", requireUser, async (req, res) => {
  console.log("\n*** Req.user", req.user);
  const user = await getUser({ username: req.user.username });
  if (user) {
    const { accessToken } = storeCookies(res, user.username, req.user.sessionId);
    return res.status(200).send({ user, accessToken });
  }
  return res.status(400).send(msg.userDoesNotExist);
});

router.delete("/logout", requireUser, async (req, res) => {
  //   changeOnline(false, req.user._id);
  const session = invalidateSession(req.user.sessionId);
  resetCookies(res); // reset cookies
  res.send(session);
});

module.exports = router;
