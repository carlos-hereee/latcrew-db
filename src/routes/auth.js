const router = require("express").Router();
const validateRegistration = require("../middleware/validateRegistration");
const requireUser = require("../middleware/requireUser");
const invalidateSession = require("../utils/invalidateSession");
const getUser = require("../db/model/users/getUser");
const isPasswordMatch = require("../utils/isPasswordMatch");
const msg = require("../data/error.message.json");
const saveSession = require("../db/model/session/saveSession");
const storeCookies = require("../utils/storeCookies");
const resetCookies = require("../utils/resetCookies");
const saveUser = require("../db/model/users/saveUser");
const { isDev } = require("../../config.env");
const getSession = require("../db/model/session/getSession");

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
  const user = await getUser({ username });
  console.log("user", user);
  console.log("req.user", req.user);
  if (user) {
    // check if passwords match
    const { isMatch } = isPasswordMatch(password, user.password);
    if (isMatch) {
      const session = await saveSession({ username });
      const { accessToken } = storeCookies(res, username, session.uid);
      res.status(200).send({ user, accessToken });
    } else res.status(400).send(msg.invalidEmailOrPassword);
  } else res.status(404).send(msg.userDoesNotExist);
});
router.post("/refresh-token", requireUser, async (req, res) => {
  const user = await getUser({ username: req.user.username });
  console.log("user", user, req.user);
  if (user) {
    console.log("user", user);
    const { accessToken } = storeCookies(res, user.username, req.user.sessionId);
    res.send({ user, accessToken });
  } else res.status(400).send(msg.userDoesNotExist);
});

router.delete("/logout", requireUser, async (req, res) => {
  //   changeOnline(false, req.user._id);
  const session = invalidateSession(req.user.sessionId);
  resetCookies(res); // reset cookies
  res.send(session);
});

module.exports = router;
