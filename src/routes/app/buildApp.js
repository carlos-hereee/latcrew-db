const { v4 } = require("uuid");
const saveApp = require("../../db/models/app/saveApp");

module.exports = async (req, res) => {
  const { appId, userId, language } = req.user;
  const { appName } = req.body;
  const { filename, size, encoding, minetype, path } = req.file;
  // store app
  const appPayload = {
    appId: appId ? appId : v4(),
    languageId: language.languageId,
    appName,
    logo: {
      url: path,
      name: appName,
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
