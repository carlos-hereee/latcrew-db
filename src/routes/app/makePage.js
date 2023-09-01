const defaultState = require("../../data/defaultState.json");
const savePage = require("../../db/models/page/savePage");
const msg = require("../../data/error.message.json");

module.exports = async (req, res) => {
  if (req.user) {
    // const { language, appId } = req.user;
    const payload = req.body;
    console.log("payload", payload);
    // const page = await savePage(payload);

    //  |+-
    // console.log("data", page);

    // if (data.length > 0) {
    //   res.status(201).send(data);
    // }
    // res.status(201).send(defaultState);
  } else res.status(403).send(msg.adminRequired);
};
