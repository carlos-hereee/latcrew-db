const router = require("express").Router();
const { getAppId, requireApp } = require("../../middleware/app");
const uploadFields = require("../../utils/multer/uploadFields");
const uploadSingle = require("../../utils/multer/uploadSingle");
const buildApp = require("./buildApp");
const getFiles = require("./getFiles");
const latest = require("./latest");
const updateApp = require("./updateApp");
const uploadFile = require("./uploadFile");

// load app data
router.get("/latest", latest);
router.get("/files", getFiles);

router.post("/file-upload", uploadFile);
router.post("/build-app", uploadSingle("logo"), buildApp);
router.post("/update-app", getAppId, requireApp, updateApp);

module.exports = router;
