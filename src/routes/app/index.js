const router = require("express").Router();
const { getApp, requireApp } = require("../../middleware/app");
const { requireUser } = require("../../middleware/auth");
const uploadSingle = require("../../utils/multer/uploadSingle");
const addPage = require("./addPage");
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
router.post("/update-app", getApp, requireApp, updateApp);
// building pages
router.post("/add-page", getApp, requireApp, uploadSingle("hero"), addPage);
// delete app
router.delete("/delete-app", deleteApp);

module.exports = router;
