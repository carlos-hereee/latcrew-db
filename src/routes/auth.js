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

// custom middleware

router.get("/", requireUser, async (req, res) => {
  res.status(200).send(req.user);
});
router.get("/:uid", requireUser, async (req, res) => {
  const { uid } = req.params;
  try {
    // const user = await Users.findOne({ uid });
    // if (user) {
    //   res.status(200).json({ message: user });
    // }
  } catch {
    res.status(404).json({
      message: "Couldn't find user with that id",
    });
  }
});
router.post("/register", validateRegistration, async (req, res) => {
  try {
    console.log("req.credentials", req.credentials);
    // const newUser = await new Users(user).save();
    // const refreshToken = genRefreshToken(newUser);
    // const accessToken = genAccessToken(newUser);
    // res.cookie(cookieName, refreshToken, { httpOnly: true });
    // res.status(200).json({ user: newUser, accessToken });
  } catch (error) {
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
      storeCookies(username, session.uid);
      res.status(200).send(session);
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
