const { v4 } = require("uuid");
const saveHero = require("../../db/models/hero/saveHero");
const saveApp = require("../../db/models/app/saveApp");

module.exports = async (req, res) => {
  const { appId, userId, language } = req.user;
  const { appName } = req.body;
  const { filename, size, encoding, minetype, path } = req.file;
  // store hero
  const heroPayload = {
    heroId: v4(),
    filename,
    size,
    encoding,
    minetype,
    url: path,
    userId,
  };
  // store app
  const appPayload = {
    appId: appId ? appId : v4(),
    languageId: language.languageId,
    appName,
    logo: { heroId: heroPayload.heroId },
  };
  await saveHero(heroPayload);
  const app = await saveApp(appPayload);
  res.status(202).json(app).end();
};
