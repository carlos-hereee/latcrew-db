const loginPayload = (menuItemId) => {
  return { name: "login", label: "login", icon: "login", link: "login", menuItemId };
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
const appPayload = (appId, languageId, appName, logo) => {
  const menuItemId = v4();
  return {
    appId: appId ? appId : v4(),
    languageId,
    appName,
    logo,
    menu: [
      {
        menuId: v4(),
        isPrivate: true,
        active: loginPayload(menuItemId),
        alternatives: [loginPayload(menuItemId), dashboardPayload(v4())],
      },
    ],
  };
};

module.exports = { loginPayload, dashboardPayload, appPayload, menuItemPayload };
