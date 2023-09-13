const { isDev } = require("../../../config.env");
const messages = require("../../db/data/error.message.json");

module.exports = (res, error) => {
  isDev && console.log("error", error);
  res.status(500).json(messages.serverIsDown).end();
};
