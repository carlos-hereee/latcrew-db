const formatFormData = require("../../utils/app/formatFormData");

module.exports = (req, res) => {
  const { appId } = req.params;
  // console.log("req.body", req.body);
  const landing = formatFormData(req.body);
  const callToAction = landing.cta;
  const subSections = landing.sections;

  console.log("landing", callToAction);
  console.log("landing", subSections);
  // console.log("req.params", req.params);
  // console.log("appId", appId);
  // console.log("landing", landing);
  // console.log("appName", appName);
  return res.status(204).end();
};
