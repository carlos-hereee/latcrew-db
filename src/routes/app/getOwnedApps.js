const useGenericErrors = require("../../utils/auth/useGenericErrors");
const getApps = require("../../db/models/app/getApps");

module.exports = async (req, res) => {
  try {
    // send owned apps
    const apps = await getApps(req.user._id);
    console.log("apps", apps);
    res.status(202).json(apps).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
