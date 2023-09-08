const { v4 } = require("uuid");
const saveApp = require("../../db/models/app/saveApp");
const { baseUrl } = require("../../../config.env");

module.exports = async (req, res) => {
  const { appId, language } = req.user;
  const { appName } = req.body;
  const { filename, size, encoding, minetype, path } = req.file;
  // store app
  const appPayload = {
    appId: appId ? appId : v4(),
    languageId: language.languageId,
    appName,
    logo: {
      url: `${baseUrl}/${path}`,
      name: appName,
      label: appName,
      logoId: v4(),
      filename,
      minetype,
      encoding,
      size,
    },
  };
  const app = await saveApp(appPayload);
  res.status(202).json(app).end();
};
