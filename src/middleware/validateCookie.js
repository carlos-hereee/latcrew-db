const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const { refreshTokenSecret, cookieName } = require("../../config.env");

module.exports = async (req, res, next) => {
  const cookie = req.cookies[cookieName];
  console.log("cookie", cookie);
  if (!cookie) {
    return res.status(400).json({ accessToken: "" });
  }
  const { username, uid } = jwt.verify(cookie, refreshTokenSecret);
  const user = await Users.findOne({ $or: [{ username }, { uid }] });
  req.user = user;
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  } else next();
};
