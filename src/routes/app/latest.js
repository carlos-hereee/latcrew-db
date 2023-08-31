const defaultState = require("../../data/defaultState.json");
const getPages = require("../../db/models/page/getPages");

module.exports = async (req, res) => {
  if (req.user) {
    const { language, appId } = req.user;
    const data = await getPages({ appId, languageId: language.languageId });
    if (data.length > 0) {
      console.log("data", data);
      res.status(201).send(data);
    }
    res.status(201).send(defaultState);
  } else res.status(202).send(defaultState);
};
