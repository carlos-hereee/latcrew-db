const { v4 } = require("uuid");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const saveHero = require("../../db/models/hero/saveHero");

// menu items values saved in Hero db
const menuItem = ({ heroId, name, link, icon }) => {
  return { heroId, name, link, label: name, icon, type: "menu-item" };
};
module.exports = async (req, res, next) => {
  try {
    // key variables
    const appId = v4();
    const menuId = v4();
    const loginMenuId = v4();
    const dashMenuId = v4();
    const appName = req.body.appName;
    const userId = req.user.userId;
    const languageId = req.user.languageId;
    const loginValues = { name: "login", link: "login", icon: "user" };
    const dashValues = { name: "dashboard", link: "dashboard", icon: "user" };
    const loginPayload = menuItem({ ...loginValues, heroId: loginMenuId });
    const dashPayload = menuItem({ ...dashValues, heroId: dashMenuId });
    // save menu item assets values
    await saveHero(loginPayload);
    await saveHero(dashPayload);
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
          active: { menuItemId: loginMenuId },
          alternatives: [{ menuItemId: loginMenuId }, { menuItemId: dashMenuId }],
        },
      ],
      calendar: { name: appName, calendarId: v4(), events: [] },
    };
    next();
  } catch (error) {
    useGenericErrors(res, error, "app payload error: ");
  }
};
