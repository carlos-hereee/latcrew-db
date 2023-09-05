const router = require("express").Router();
const requireUser = require("../../middleware/auth/requireUser");
const getFiles = require("./getFiles");
const latest = require("./latest");
const uploadFile = require("./uploadFile");

router.get("/latest", latest);
router.get("/files", getFiles);

router.post("/file-upload", uploadFile);

module.exports = router;
