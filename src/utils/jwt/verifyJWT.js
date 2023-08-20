const jwt = require("jsonwebtoken");
const { jwtPrivateKey } = require("../../../config.env");
const msg = require("../../data/error.message.json");

module.exports = (token) => {
  return jwt.verify(token, jwtPrivateKey, (error, decoded) => {
    // check if token is expired
    const isExpired = error ? error.message.includes("jwt expired") : false;
    // check valid values
    return {
      payload: decoded,
      error: {
        error,
        expired: isExpired,
        status: isExpired ? 401 : 403,
        message: isExpired ? msg.payloadExpired : msg.notVerfifed,
      },
    };
  });
};
