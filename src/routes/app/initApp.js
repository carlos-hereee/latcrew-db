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
    const loginId = v4();
    const dashId = v4();
    const appName = req.body.appName;
    const languageId = req.user.languageId || "";
    const loginData = { name: "login", link: "login", icon: "user", heroId: loginId };
    const dashData = { name: "dashboard", link: "dashboard", icon: "user" };
    const loginPayload = menuItem({ ...loginData, menuItemId: loginId });
    const dashPayload = menuItem({ ...dashData, menuItemId: dashId, heroId: dashId });
    // save app menu item assets values
    const login = await saveHero(loginPayload);
    const dash = await saveHero(dashPayload);
    // init app
    const app = await saveApp({
      appId,
      languageId,
      appName,
      ownerId: req.user._id,
      adminIds: [req.user._id],
      themeList: ["light-mode", "dark-mode"],
      menu: [
        {
          menuId,
          isPrivate: true,
          active: login._id,
          alternatives: [login._id, dash._id],
        },
      ],
      calendar: { name: appName, calendarId: v4(), events: [] },
    });
    // update user   ownedApps
    req.user.ownedApps = [...req.user.ownedApps, app._id];
    // add user permissions
    req.user.permissions = [...req.user.permissions, { appId: app._id, role: "admin" }];
    req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
