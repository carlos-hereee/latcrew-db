const router = require("express").Router();
const validateRegistration = require("../middleware/validateRegistration");
const requireUser = require("../middleware/requireUser");
const invalidateSession = require("../db/model/session/updateSession");
const getUser = require("../db/model/users/getUser");
const msg = require("../data/error.message.json");
const message = require("../data/success.message.json");
const saveSession = require("../db/model/session/saveSession");
const storeCookies = require("../utils/cookies/storeCookies");
const resetCookies = require("../utils/cookies/resetCookies");
const saveUser = require("../db/model/users/saveUser");
const { isDev } = require("../../config.env");
const updatePassword = require("../db/model/users/updatePassword");
// custom middleware
const validateUser = require("../middleware/validateUser");
const validatePassword = require("../middleware/validatePassword");
const validateSession = require("../middleware/validateSession");

const authMiddleWare = [validateUser, validatePassword, validateSession];

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
router.post("/login", authMiddleWare, async (req, res) => {
  console.log("req.credentials", req.user);
  // if (session.length > 1) {
  //   console.log("session", session.length);
  //   console.log("session", session[0]);
  // }
  // const { accessToken } = storeCookies(res, username, session.uid);
  // return res.status(200).send({ user, accessToken });
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
router.put("/change-password", authMiddleWare, async (req, res) => {
  const updatedPassword = await updatePassword(req.credentials.uid, req.credentials);
  if (updatedPassword.acknowledged) return res.status(200).send(message.passwordChanged);
  else return res.status(500).send(msg.serverIsDown);
});
router.delete("/logout", requireUser, async (req, res) => {
  //   changeOnline(false, req.user._id);
  const session = invalidateSession(req.user.sessionId);
  resetCookies(res); // reset cookies
  res.send(session);
});

module.exports = router;
