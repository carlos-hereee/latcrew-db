const getApp = require("../../db/models/app/getApp");
const messages = require("../../db/data/error.message.json");

module.exports = async (req, res, next) => {
  const { appId } = req.params;
  const app = await getApp({ appId });
  if (!app) res.status(400).json(messages.appNotFound).end();
  req.app = app;
  next();
};
