const formatFormData = require("../../utils/app/formatFormData");
const formatPageData = require("../../utils/app/formatPageData");

module.exports = (req, res) => {
  const { appId } = req.params;
  const formData = formatFormData(req.body);
  const { pageData, refs } = formatPageData(formData);
  console.log("data", refs);
  // check if it contains Ctas
  if (refs.length > 0) {
    // save Cta and store ref ids
    refs.forEach((cta) => {
      console.log("cta", cta);
    });
  }

  // console.log("req.params", req.params);
  // console.log("appId", appId);
  // console.log("landing", landing);
  // console.log("appName", appName);
  return res.status(204).end();
};
