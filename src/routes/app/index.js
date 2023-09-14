const router = require("express").Router();
const { getApp, requireApp } = require("../../middleware/app");
const saveAsset = require("../../middleware/app/saveAsset");
const { requireUser } = require("../../middleware/auth");
const addPage = require("./addPage");
const buildApp = require("./buildApp");
const deleteApp = require("./deleteApp");
const getFiles = require("./getFiles");
const getOwnedApps = require("./getOwnedApps");
const initAppPayload = require("./initAppPayload");
const latest = require("./latest");
const updateApp = require("./updateApp");
const uploadFile = require("./uploadFile");
// one liner
const appWare = [getApp, requireApp];

// load app data
router.get("/latest/:appId", requireUser, latest);
router.get("/ownedApps", requireUser, getOwnedApps);
router.get("/files", getFiles);
// build app data
router.post("/upload-file", saveAsset, uploadFile);
router.post("/build-app", initAppPayload, requireApp, buildApp);
router.post("/update-app", appWare, updateApp);
// building pages
router.post("/add-page", appWare, saveAsset, addPage);
// delete app
router.delete("/delete-app", deleteApp);

module.exports = router;
