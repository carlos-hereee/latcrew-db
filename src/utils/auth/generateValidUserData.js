module.exports = (user) => {
  return {
    userId: user.userId,
    username: user.username,
    role: user.role,
    email: user.email ? user.email : "",
    appId: user.appId ? user.appId : "",
    nickname: user.nickname ? user.nickname : "",
    heroId: user.heroId ? user.heroId : "",
    langaugeId: user.langaugeId ? user.langaugeId : "",
  };
};
