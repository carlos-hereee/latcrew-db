const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const registrationCred = require("../middleware/registrationCred");
const requireUser = require("../middleware/requireUser");
const invalidateSession = require("../utils/invalidateSession");
const getUser = require("../db/model/users/getUser");
const isPasswordMatch = require("../utils/isPasswordMatch");
const msg = require("../data/error.message.json");

// custom middleware

router.get("/", async (req, res) => {
  res.status(200).json(req.user);
});
router.get("/:uid", async (req, res) => {
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
router.post("/register", registrationCred, async (req, res) => {
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  user.uid = uuidv4();
  user.nickname = user.username;
  user.isOnline = true;
  try {
    const newUser = await new Users(user).save();
    const refreshToken = genRefreshToken(newUser);
    const accessToken = genAccessToken(newUser);
    res.cookie(cookieName, refreshToken, { httpOnly: true });
    res.status(200).json({ user: newUser, accessToken });
  } catch (error) {
    res.status(400).json({ message: "Failed to make user" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await getUser({ username, email });
    const { isMatch } = isPasswordMatch(password, user.password);
    if (isMatch) {
      // res.status(200).send(user);
    } else {
      res.status(400).send(msg.invalidEmailOrPassword);
    }
  } catch (error) {
    res.status(404).send(msg.userNotFound);
  }
});
router.post("/refresh-token", requireUser, async (req, res) => {
  res.send(req.user);
});

router.delete("/logout", requireUser, async (req, res) => {
  //   changeOnline(false, req.user._id);
  const session = invalidateSession(req.user.sessionId);
  // reset cookies
  res.cookie("accessToken", "", { maxAge: 0, httpOnly: true });
  res.cookie("refreshToken", "", { maxAge: 0, httpOnly: true });
  return res.send(session);
});

module.exports = router;
