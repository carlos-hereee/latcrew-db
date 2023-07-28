const jwt = require("jsonwebtoken");
const { accessTokenSecret, refreshTokenSecret } = require("../../config.env");

const useableUserData = (user) => {
  return {
    username: user.username,
    uid: user.uid,
    nickname: user.nickname,
    isOnline: user.isOnline,
  };
};
// generate token
const genToken = (user, secret, length) => {
  return jwt.sign({ username: user.username, uid: user.uid }, secret, length);
};

// generate tokens
const genAccessToken = (user) => {
  return genToken(user, accessTokenSecret, {
    expiresIn: "1d",
  });
};
const genRefreshToken = (user) => {
  return genToken(user, refreshTokenSecret, {
    expiresIn: "30d",
  });
};

module.exports = { useableUserData, genAccessToken, genRefreshToken };
