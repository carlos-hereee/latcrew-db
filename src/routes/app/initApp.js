const { v4 } = require("uuid");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const formatLogoData = require("../../utils/app/formatLogoData");
const createApp = require("../../db/models/app/createApp");

// menu items values saved in Hero db
// const menuItem = ({ heroId, name, link, icon }) => {
//   return { heroId, name, link, label: name, icon, type: "menu-item" };
// };
module.exports = async (req, res, next) => {
  try {
    // key variables
    const { appName } = req.body;
    const userId = req.user._id;
    const heroId = v4();
    const appId = v4();
    // declare logo data
    const logo = formatLogoData(appName, req.file);
    const id = await updateHero({ heroId }, { ...logo, heroId });
    // init app
    const appPayload = { appName, logo: id, appId, ownerId: userId, adminIds: [userId] };
    const app = await createApp(appPayload);
    // update user   ownedApps
    req.user.ownedApps = [...req.user.ownedApps, app._id];
    // add user permissions
    req.user.permissions = [...req.user.permissions, { appId: app._id, role: "owner" }];
    req.user.save();
    next();

    // const landingPage = req.body.logo;
    //   // remove false values
    //   const landing = {
    //     ...landingPage,
    //     cta: !landingPage.cta ? null : landingPage.cta,
    //     sections: !landingPage.sections ? [] : landingPage.sections,
    //   };
    //   const languageId = req.user.languageId || "";
    //   const loginData = { name: "login", link: "login", icon: "user", heroId: ids.loginId };
    //   const dashData = { name: "dashboard", link: "dashboard", icon: "user" };
    //   const loginPayload = menuItem({ ...loginData, menuItemId: ids.loginId });
    //   const dashPayload = menuItem({
    //     ...dashData,
    //     menuItemId: ids.dashId,
    //     heroId: ids.dashId,
    //   });
    //   // save app menu item assets values
    //   const login = await saveHero(loginPayload);
    //   const dash = await saveHero(dashPayload);
    //   // init app
    //   const app = await saveApp({
    //     appId: ids.appId,
    //     languageId,
    //     appName,
    //     ownerId: req.user._id,
    //     adminIds: [req.user._id],
    //     themeList: ["light-mode", "dark-mode"],
    //     landing,
    //     menu: [
    //       {
    //         menuId,
    //         isPrivate: true,
    //         active: login._id,
    //         alternatives: [login._id, dash._id],
    //       },
    //     ],
    //     calendar: { name: appName, calendarId: v4(), events: [] },
    //   });
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
