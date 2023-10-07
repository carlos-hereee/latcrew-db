const formatFormData = require("../../utils/app/formatFormData");

module.exports = (req, res) => {
  const { appId } = req.params;
  const appName = formatFormData(req.body.appName);
  // console.log("req.params", req.params);
  // const callToAction =
  console.log("appId", appId);
  console.log("appName", appName);
  return res.status(204).end();
};
