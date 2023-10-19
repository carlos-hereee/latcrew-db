const { v4 } = require("uuid");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    const appName = req.body.appName;
    // key variables
    const heroId = v4();
    // declare logo data
    const logo = formatLogoData(appName, req.file);
    const id = await updateHero({ heroId }, { ...logo, heroId });
    req.logoId = id;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error updating logo and appname");
  }
};
