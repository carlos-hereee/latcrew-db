const getApp = require("../../db/models/app/getApp");

module.exports = async (req, res) => {
  const { appId } = req.user;
  console.log("appId", appId);
  const app = await getApp({ appId });

  // if (data.length > 0) {
  console.log("lastest and greatest", app);
  return res.status(201).json(app).end();
  // }
  // return res.status(400).json(defaultState).end();
};
