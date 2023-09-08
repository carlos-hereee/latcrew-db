const router = require("express").Router();
const sendFile = require("./sendFile");

// load app data
router.get("/:assetId", sendFile);

module.exports = router;
