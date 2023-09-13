const { isDev } = require("../../../config.env");

module.exports = (res, error) => {
  isDev && console.log("error", error);
  res.status(500).json(msg.serverIsDown).end();
};
