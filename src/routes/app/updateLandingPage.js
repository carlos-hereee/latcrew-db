const formatFormData = require("../../utils/app/formatFormData");
const formatPageData = require("../../utils/app/formatPageData");

module.exports = (req, res) => {
  const { appId } = req.params;
  const formData = formatFormData(req.body);
  const {} = formatPageData(formData);

  // console.log("req.params", req.params);
  // console.log("appId", appId);
  // console.log("landing", landing);
  // console.log("appName", appName);
  return res.status(204).end();
};
