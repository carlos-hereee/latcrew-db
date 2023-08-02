const jwt = require("jsonwebtoken");
const { jwtPrivateKey } = require("../../config.env");

module.exports = async (token) => {
  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
};
