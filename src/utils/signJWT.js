const jwt = require("jsonwebtoken");
const { jwtPrivateKey } = require("../../config.env");

module.exports = (payload, expiresIn) => {
  console.log("jwtPrivateKey", jwtPrivateKey);
  return jwt.sign(payload, jwtPrivateKey, { algorithm: "RS256", expiresIn });
};
