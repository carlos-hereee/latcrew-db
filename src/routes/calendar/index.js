const router = require("express").Router();
const addEvent = require("./addEvent");

router.post("/add-event", addEvent);

module.exports = router;
