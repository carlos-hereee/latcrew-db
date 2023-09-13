const { v4 } = require("uuid");
const saveApp = require("../../db/models/app/saveApp");
const { baseUrl } = require("../../../config.env");
const { appPayload } = require("./helpers/appPayload");

module.exports = async (req, res) => {
  // key variables
  const languageId = req.user.languageId;
  const appId = req.user.appId;
  const logoId = req.hero.heroId;
  // save logo to asset

  const { appName } = req.body;
  // console.log("req.file", req.file);
  const payload = appPayload(appId, languageId, appName, logoId);
  // console.log("req.hero", req.hero);
  console.log("payload", payload);
  // const app = await saveApp(payload);
  // res.status(202).json(app).end();
};
