const router = require("express").Router();
const { getApp, requireApp } = require("../../middleware/app");
const saveAsset = require("../../middleware/app/saveAsset");
const { requireUser } = require("../../middleware/auth");
const uploadSingle = require("../../utils/multer/uploadSingle");
const addPage = require("./addPage");
const buildApp = require("./buildApp");
const deleteApp = require("./deleteApp");
const getFiles = require("./getFiles");
const latest = require("./latest");
const updateApp = require("./updateApp");
const uploadFile = require("./uploadFile");
// one liner
const appWare = [getApp, requireApp];

// load app data
router.get("/latest", requireUser, latest);
router.get("/files", getFiles);
// build app data
router.post("/file-upload", uploadFile);
router.post("/build-app", uploadSingle("logo"), saveAsset, buildApp);
router.post("/update-app", appWare, updateApp);
// building pages
router.post("/add-page", appWare, uploadSingle("hero"), saveAsset, addPage);
// delete app
router.delete("/delete-app", deleteApp);

module.exports = router;
