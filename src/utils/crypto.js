const crypto = require("crypto");
const { appSecret } = require("../../config.env");

const random = () => crypto.randomBytes(128).toString("base64");
const authentication = (salt, password) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(appSecret)
    .digest("hex");
};

module.exports = { random, authentication };
