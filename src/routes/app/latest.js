const msg = require("../../db/data/error.message.json");
const getApp = require("../../db/models/app/getApp");

module.exports = async (req, res) => {
  const { appId } = req.user;
  const app = await getApp({ appId });
  if (!app) return res.status(404).json(msg.appNotFound).end();

  return res.status(201).json(app).end();
};
