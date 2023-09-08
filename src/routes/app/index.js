const router = require("express").Router();
const { getAppId, requireApp } = require("../../middleware/app");
const { requireUser } = require("../../middleware/auth");
const uploadFields = require("../../utils/multer/uploadFields");
const uploadSingle = require("../../utils/multer/uploadSingle");
const buildApp = require("./buildApp");
const deleteApp = require("./deleteApp");
const getFiles = require("./getFiles");
const latest = require("./latest");
const updateApp = require("./updateApp");
const uploadFile = require("./uploadFile");

// load app data
router.get("/latest", requireUser, latest);
router.get("/files", getFiles);
// build app data
router.post("/file-upload", uploadFile);
router.post("/build-app", uploadSingle("logo"), buildApp);
router.post("/update-app", getAppId, requireApp, updateApp);
// delete app
router.delete("/delete-app", deleteApp);

module.exports = router;
