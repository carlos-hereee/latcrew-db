const { v4 } = require("uuid");
const updateHero = require("../../../db/models/hero/updateHero");
const { baseUrl } = require("../../../../config.env");

module.exports = async (req, res) => {
  // check if app logo has logo
  const appName = req.body.appName;
  const refId = req.app.logo;
  // logo payload
  const logo = {
    ...req.file,
    heading: appName,
    title: appName,
    // TODO: compress image for faster loading
    small: `${baseUrl}/${req.file.path}`,
    url: `${baseUrl}/${req.file.path}`,
    alt: "Industry brand",
  };
  //  updating previous logo
  if (refId) {
    const id = await updateHero({ refId }, logo);
    req.app.logo = id;
  } else {
    //  create a new logo
    const heroId = v4();
    const id = await updateHero({ heroId }, { ...logo, heroId });
    req.app.logo = id;
  }
  await req.app.save();
  res.status(200).json(req.app).end();
};
