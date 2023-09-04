const defaultState = require("../../data/defaultState.json");
const getPages = require("../../db/models/page/getPages");

module.exports = async (req, res) => {
  if (!req.user) return res.status(201).json(defaultState).end();
  const { language, appId } = req.user;
  const data = await getPages({ appId, languageId: language.languageId });
  console.log("data", data);
  if (data.length > 0) {
    return res.status(201).json(data).end();
  }
  return res.status(201).json(defaultState).end();
};
