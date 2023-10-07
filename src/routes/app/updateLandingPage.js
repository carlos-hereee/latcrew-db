const { v4 } = require("uuid");
const saveHero = require("../../db/models/hero/saveHero");
const updateHero = require("../../db/models/hero/updateHero");
const formatFormData = require("../../utils/app/formatFormData");
const formatPageData = require("../../utils/app/formatPageData");

module.exports = async (req, res) => {
  const formData = formatFormData(req.body);
  const { pageData, refs } = formatPageData(formData);
  // check if it contains Ctas
  // console.log("pageData", pageData);
  // if (refs.length > 0) {
  //   // save and store ref ids
  //   refs.forEach(async (ref) => {
  //     const heroId = ref?.heroId;
  //     // check if its already in db avoid duplicate data
  //     if (heroId) await updateHero({ heroId }, ref);
  //     else {
  //       ref.heroId = v4();
  //       const hero = await saveHero(ref);
  //       // console.log("pageData", pageData[ref.groupName]);
  //       // pageData[ref.groupName].push(hero._id);
  //     }
  //   });
  // }
  // console.log("req.app", req.app);
  // update app
  // req.app.landing = pageData;
  // await req.app.save();
  return res.status(200).json(req.app).end();
};
