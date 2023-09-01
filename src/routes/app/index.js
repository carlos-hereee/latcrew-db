const router = require("express").Router();
const requireUser = require("../../middleware/auth/requireUser");
const latest = require("./latest");

router.get("/latest", latest);

module.exports = router;
