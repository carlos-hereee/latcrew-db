const jwt = require("jsonwebtoken");
const { jwtPublicKey } = require("../../config.env");

module.exports = (token) => {
  try {
    const decoded = jwt.verify(token, jwtPublicKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes("jwt expired") };
  }
};
