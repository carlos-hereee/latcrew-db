const saveHero = require("../../db/models/hero/saveHero");
const updateHero = require("../../db/models/hero/updateHero");
const formatFormData = require("../../utils/app/formatFormData");
const formatPageData = require("../../utils/app/formatPageData");

module.exports = async (req, res) => {
  const formData = formatFormData(req.body);
  const { pageData, refs } = formatPageData(formData);
  console.log("data", refs);
  // check if it contains Ctas
  if (refs.length > 0) {
    // save Cta and store ref ids
    refs.forEach(async (ref) => {
      const key = ref.groupName;
      const heroId = ref?.heroId;
      if (heroId) {
        await updateHero({ heroId }, ref);
      } else {
        const hero = await saveHero(ref);
        pageData[key] = [...page[key], hero._id];
      }
    });
  }
  req.app = pageData.save();

  // console.log("req.params", req.params);
  // console.log("appId", appId);
  // console.log("landing", landing);
  // console.log("appName", appName);
  return res.status(200).json(req.app).end();
};
