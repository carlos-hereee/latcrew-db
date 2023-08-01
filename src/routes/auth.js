const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const validateRegistration = require("../middleware/validateRegistration");
const requireUser = require("../middleware/requireUser");
const invalidateSession = require("../utils/invalidateSession");
const getUser = require("../db/model/users/getUser");
const isPasswordMatch = require("../utils/isPasswordMatch");
const msg = require("../data/error.message.json");
const saveSession = require("../db/model/session/saveSession");
const signJWT = require("../utils/signJWT");
const storeCookies = require("../utils/storeCookies");
const resetCookies = require("../utils/resetCookies");
const saveUser = require("../db/model/users/saveUser");
const { isDev } = require("../../config.env");

// custom middleware

router.get("/", requireUser, async (req, res) => {
  res.status(200).send(req.user);
});
router.get("/:uid", requireUser, async (req, res) => {
  try {
    const user = await getUser({ uid: req.params.uid });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(msg.userDoesNotExist);
  }
});
router.post("/register", validateRegistration, async (req, res) => {
  try {
    const user = await saveUser(req.credentials);
    const session = await saveSession({ username: user.username });
    const { accessToken } = storeCookies(username, session.uid);
    res.status(200).send({ user, accessToken });
  } catch (error) {
    if (isDev) console.log(error);
    res.status(400).json({ message: "Failed to make user" });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser({ username });
  if (user.password) {
    // check if passwords match
    const { isMatch } = isPasswordMatch(password, user.password);
    if (isMatch) {
      const session = await saveSession({ username });
      const { accessToken } = storeCookies(username, session.uid);
      res.status(200).send({ user, accessToken });
    } else res.status(400).send(msg.invalidEmailOrPassword);
  } else res.status(404).send(msg.userDoesNotExist);
});
router.post("/refresh-token", requireUser, async (req, res) => {
  res.send(req.user);
});

router.delete("/logout", requireUser, async (req, res) => {
  //   changeOnline(false, req.user._id);
  const session = invalidateSession(req.user.sessionId);
  resetCookies(); // reset cookies
  res.send(session);
});

module.exports = router;
