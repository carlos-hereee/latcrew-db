const formatFormData = require("../../utils/app/formatFormData");

module.exports = (req, res) => {
  const { appId } = req.params;

  const appName = formatFormData(req.body.appName);
  // console.log("req.params", req.params);
  console.log("appId", appId);
  console.log("appName", appName);
  return;
};
