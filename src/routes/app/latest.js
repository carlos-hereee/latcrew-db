const defaultState = require("../../data/defaultState.json");

module.exports = (req, res) => {
  if (req.user) {
    console.log("req.user", req.user);
    res.status(201).send(defaultState);
  } else res.status(202).send(defaultState);
};
