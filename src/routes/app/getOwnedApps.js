const getApps = require("../../db/models/app/getApps");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    const apps = await getApps(req.user.ownedApps);
    res.status(200).json(apps).end();
  } catch (error) {
    useGenericErrors(res, error, "errro: getting owned apps");
  }
};
