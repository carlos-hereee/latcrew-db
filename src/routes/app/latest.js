const defaultState = require("../../data/defaultState.json");
const getPages = require("../../db/models/page/getPages");

module.exports = async (req, res) => {
  const { language, appId } = req.user;
  const data = await getPages({ appId, languageId: language.languageId });

  // if (data.length > 0) {
  console.log("lastest and greatest", data);
  return res.status(201).json(data).end();
  // }
  // return res.status(400).json(defaultState).end();
};
