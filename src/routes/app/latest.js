const getApp = require("../../db/models/app/getApp");
const msg = require("../../data/error.message.json");

module.exports = async (req, res) => {
  const { appId } = req.user;
  // console.log("appId", appId);
  const app = await getApp({ appId });
  if (!app) return res.status(404).json(msg.appNotFound).end();

  // if (data.length > 0) {
  console.log("lastest and greatest", app);
  return res.status(201).json(app).end();
  // }
  // return res.status(400).json(defaultState).end();
};
