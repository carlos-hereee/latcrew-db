const router = require("express").Router();
const Users = require("../db/schema/user");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const registrationCred = require("../middleware/registrationCred");

// custom middleware

router.get("/", async (req, res) => {
  res.status(200).json(req.user);
});
router.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await Users.findOne({ uid });
    if (user) {
      res.status(200).json({ message: user });
    }
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
  } catch (e) {
    res.status(400).json({ message: "Failed to make user" });
  }
});
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (bcrypt.compareSync(password, user.password)) {
      // const refreshToken = genRefreshToken(user);
      // const accessToken = genAccessToken(user);
      // changeOnline(true, user._id);
      // const data = await Users.findOne({ username });
      // res.status(200).cookie(cookieName, refreshToken, { httpOnly: true });
      // res.json({ user: data, accessToken: accessToken });
    } else {
      res.status(404).json({ message: "username or password are invalid" });
    }
  } catch {
    res.status(400).json({ message: "User does not exist" });
  }
});
router.post("/refresh-token", async (req, res) => {
  // const { user } = req;
  console.log("user", req.user);
  // token is valid and send an access token
  // const refreshToken = genRefreshToken(user);
  // const accessToken = genAccessToken(user);
  // res.cookie(cookieName, refreshToken, { httpOnly: true }).status(200);
  // res.json({ accessToken: accessToken, user: user });
});

router.delete("/logout", async (req, res) => {
  try {
    changeOnline(false, req.user._id);
    if (req.session) {
      req.session.destroy();
    }
    res.status(202).json({ message: "successful logout" });
  } catch {
    res.status(400).json({ message: "error loggin out" });
  }
});

module.exports = router;
