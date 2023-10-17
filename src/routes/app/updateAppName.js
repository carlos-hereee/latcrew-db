const formatFormData = require("../../utils/app/formatFormData");

module.exports = (req, res) => {
  const { appId } = req.params;
  console.log("req.body", req.body);
  const logo = req.body.logo;
  console.log("log", logo);
  // const appName = formatFormData(req.body.appName);
  // console.log("req.params", req.params);
  // const callToAction =
  console.log("appId", appId);
  // console.log("appName", appName);
  // return res.status(204).end();
};
