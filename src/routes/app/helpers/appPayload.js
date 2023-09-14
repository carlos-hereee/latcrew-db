const { v4 } = require("uuid");

const loginPayload = (menuItemId) => {
  return { name: "login", label: "login", icon: "user", link: "login", menuItemId };
};
const dashboardPayload = (menuItemId) => {
  return {
    name: "dashboard",
    label: "dashboard",
    icon: "user",
    link: "dashboard",
    menuItemId,
  };
};
const menuItemPayload = (menuItemId, name, link) => {
  return { menuItemId, name, link, label: name, icon: name };
};
const appPayload = ({ appId, languageId, appName, ownerId }) => {
  const menuItemId = v4();
  return {
    appId,
    languageId,
    appName,
    ownerId,
    themeList: ["light-mode", "dark-mode"],
    menu: [
      {
        menuId: v4(),
        isPrivate: true,
        active: loginPayload(menuItemId),
        alternatives: [loginPayload(menuItemId), dashboardPayload(v4())],
      },
    ],
    calendar: { name: appName, calendarId: v4(), events: [] },
  };
};
const pagePayload = (appId, languageId, reqBody, heroId) => {
  const { title, name, cta, sections, body } = reqBody;
  return {
    appId,
    languageId,
    pageId: v4(),
    heroId,
    title,
    name,
    body,
    cta: cta ? cta : [{}],
    sections: sections ? sections : [{}],
  };
};
module.exports = {
  loginPayload,
  dashboardPayload,
  appPayload,
  menuItemPayload,
  pagePayload,
};
