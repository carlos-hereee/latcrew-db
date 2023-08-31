const router = require("express").Router();
const latest = require("./latest");

router.get("/latest", latest);

module.exports = router;
