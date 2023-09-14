module.exports = (user) => {
  // key variables
  let appId = "";
  let ownedApps = user.ownedApps;
  let permissions = [];
  // total apps owned  is 1 make that appId
  if (user.ownedApps.length === 1) appId = user.ownedApps[0];
  // total apps owned  more than one
  if (user.permissions.length > 0) {
    permissions = user.permissions.map((app) => {
      return { appId: app.appId, role: app.role };
    });
  }
  return {
    userId: user.userId,
    username: user.username,
    role: user.role,
    email: user.email ? user.email : "",
    appId,
    nickname: user.nickname ? user.nickname : "",
    heroId: user.heroId ? user.heroId : "",
    langaugeId: user.langaugeId ? user.langaugeId : "",
    ownedApps,
    permissions,
  };
};
