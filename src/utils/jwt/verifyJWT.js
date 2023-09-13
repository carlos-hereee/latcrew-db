const jwt = require("jsonwebtoken");
const { jwtPrivateKey } = require("../../../config.env");
const msg = require("../../db/data/error.message.json");

module.exports = (token) => {
  return jwt.verify(token, jwtPrivateKey, (err, decoded) => {
    const isExpired = err ? err.message.includes("jwt expired") : false;
    let error = {
      err,
      expired: isExpired,
      status: isExpired ? 401 : 403,
      message: isExpired ? msg.payloadExpired : msg.notVerfifed,
    };
    const { username, sessionId } = decoded;
    return { username, sessionId, error };
  });
};
