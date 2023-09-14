const { v4 } = require("uuid");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const saveHero = require("../../db/models/hero/saveHero");

const menuItemPayload = ({ menuItemId, name, link, icon }) => {
  return { menuItemId, name, link, label: name, icon };
};
module.exports = async (req, res, next) => {
  try {
    // key variables
    const appId = v4();
    const appName = req.body.appName;
    const userId = req.user.userId;
    const languageId = req.user.languageId ? req.user.languageId : "";
    const menuId = v4();
    const loginMenuId = v4();
    const loginValues = { name: "login", link: "login", icon: "user" };
    const dashboardMenuId = v4();
    const dashValues = { name: "dashboard", link: "dashboard", icon: "user" };
    const loginPayload = menuItemPayload({ ...loginValues, menuItemId: loginMenuId });
    const dashPayload = menuItemPayload({ ...dashValues, menuItemId: dashboardMenuId });
    // save menu item assets values
    await saveHero({ ...loginPayload, userId, heroId: loginMenuId });
    await saveHero({ ...dashPayload, userId, heroId: dashboardMenuId });
    // set init app
    req.app = {
      appId,
      languageId,
      appName,
      ownerId: userId,
      themeList: ["light-mode", "dark-mode"],
      menu: [
        {
          menuId,
          isPrivate: true,
          active: loginPayload,
          alternatives: [loginPayload, dashPayload],
        },
      ],
      calendar: { name: appName, calendarId: v4(), events: [] },
    };
    next();
  } catch (error) {
    useGenericErrors(res, error, "app payload error: ");
  }
};
