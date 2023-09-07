const defaultState = require("../../data/defaultState.json");
const savePage = require("../../db/models/page/savePage");
const msg = require("../../../db/data/error.message.json");

module.exports = async (req, res) => {
  if (req.user) {
    // const { language, appId } = req.user;
    const payload = req.body;
    console.log("payload", payload);
    // const page = await savePage(payload);

    //  |+-
    // console.log("data", page);

    // if (data.length > 0) {
    //   res.status(201).json(data).end();
    // }
    // res.status(201).json(defaultState).end();
  } else {
    const message = msg.adminRequired;
    res.status(403).json(message).end();
  }
};
