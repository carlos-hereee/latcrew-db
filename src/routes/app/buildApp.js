const { v4 } = require("uuid");
const saveApp = require("../../db/models/app/saveApp");
const { baseUrl } = require("../../../config.env");

module.exports = async (req, res) => {
  // key variables
  const appId = req.user.appId || v4();
  const menuId = v4();
  const menuItemId = v4();
  const menuItemAltId = v4();
  const language = req.user.language;
  const { appName } = req.body;
  const { filename, size, encoding, minetype, path } = req.file;
  // store app
  const appPayload = {
    appId,
    languageId: language.languageId,
    appName,
    logo: {
      url: `${baseUrl}/${path}`,
      // TODO: create compressed images for quick load
      name: appName,
      label: appName,
      logoId: v4(),
      filename,
      minetype,
      encoding,
      size,
    },
    menu: [
      {
        menuId,
        isPrivate: true,
        active: { name: "login", label: "login", icon: "login", menuItemId },
        alternatives: [
          { name: "login", label: "login", icon: "user", menuItemId },
          {
            name: "dashboard",
            label: "dashboard",
            icon: "user",
            menuItemId: menuItemAltId,
          },
        ],
      },
    ],
  };
  const app = await saveApp(appPayload);
  res.status(202).json(app).end();
};
