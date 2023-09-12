const { v4 } = require("uuid");
const saveApp = require("../../db/models/app/saveApp");
const { baseUrl } = require("../../../config.env");
const { appPayload } = require("./helpers/appPayload");

module.exports = async (req, res) => {
  // key variables
  const languageId = req.user.language.languageId;
  const appId = req.user.appId;
  const { appName } = req.body;

  const payload = appPayload(appId, languageId, appName, {
    url: `${baseUrl}/${req.file.path}`,
    // TODO: create compressed images for quick load
    name: appName,
    label: appName,
    logoId: v4(),
    ...req.file,
  });

  const app = await saveApp(payload);
  res.status(202).json(app).end();
};
