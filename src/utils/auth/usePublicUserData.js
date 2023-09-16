module.exports = (user) => {
  // key variables
  let appId = "";
  let isAdmin = user.ownedApps.length === 1;
  let permissions = [];
  if (user.ownedApps.length === 1) appId = user.ownedApps[0];
  // total apps owned  more than one
  if (user.permissions.length > 0) {
    permissions = user.permissions.map((app) => {
      if (app.role === "admin") isAdmin = true;
      return { appId: app.appId, role: app.role };
    });
  }
  return {
    appId,
    isAdmin,
    permissions,
    userId: user.userId,
    username: user.username,
    role: user.role,
    email: user.email ? user.email : "",
    nickname: user.nickname ? user.nickname : "",
    heroId: user.heroId ? user.heroId : "",
    langaugeId: user.langaugeId ? user.langaugeId : "",
  };
};
