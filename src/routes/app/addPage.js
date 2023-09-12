const { v4 } = require("uuid");
const { pagePayload, menuItemPayload } = require("./helpers/appPayload");
const savePage = require("../../db/models/page/savePage");
const updateApp = require("../../db/models/app/updateApp");

module.exports = async (req, res) => {
  try {
    // key variables
    const languageId = req.user.language.languageId;
    const appId = req.user.appId;
    // const { title, name, body } = req.body;
    const { menu } = req.app;
    const pageName = req.body.name;
    // TODO: add hero to bd
    const heroId = req.file ? v4() : "";
    const payload = pagePayload(appId, languageId, req.body, heroId);
    await savePage(payload);
    // add page to app data menu
    const menuItem = menuItemPayload(v4(), pageName, pageName);
    menu.push({ menuId: v4(), active: menuItem });
    await updateApp({ appId }, req.app);

    res.status(201).end();
  } catch (error) {
    console.log("error", error);
    res.status(500).end();
  }
};
