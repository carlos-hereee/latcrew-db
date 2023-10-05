module.exports = async (req, res) => {
  const { appName, landing, id, appId } = req.body;
  // console.log("appName, landing,id, appId", appName, landing, id, appId);
  console.log("landing", landing);

  const hasCta = landing.filter((l) => {
    if (l.group === "hasCta") return l;
  });
  const hasSections = landing.filter((l) => {
    if (l.group === "hasSections") return l;
  });
  console.log("hasCta", hasCta);
  console.log("hasSections", hasSections);
  const payload = {
    appName,
    appId,
    _id: id,
    landing: {
      ...landing,
    },
  };
};
