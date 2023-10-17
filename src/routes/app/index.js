const router = require("express").Router();
const { getApp, requireApp } = require("../../middleware/app");
const saveAsset = require("../../middleware/app/saveAsset");
const { requireUser } = require("../../middleware/auth");
const addPage = require("./addPage");
const deleteApp = require("./deleteApp");
// const getFiles = require("./getFiles");
const initApp = require("./initApp");
const latest = require("./latest");
const updateApp = require("./updateApp/app");
const uploadFile = require("./uploadFile");
const getOwnedApps = require("./getOwnedApps");
const getAppWithName = require("./getAppWithName");
const updateAppName = require("./updateApp/appName");
const updateLandingPage = require("./updateApp/landingPage");
const requireAdmin = require("../../middleware/app/requireAdminPermission");
const uploadSingle = require("../../utils/multer/uploadSingle");
const updateAppLogo = require("./updateApp/appLogo");
// one liner
const appWare = [getApp, requireApp];
const updateLogoWare = [requireAdmin, uploadSingle("logo"), updateAppName];

// load app data
router.get("/:appName", requireUser, getAppWithName);
router.get("/latest/:appId", requireUser, latest);
// router.get("/ownedApps", requireUser, getOwnedApps, );
// router.get("/files", getFiles);
// build app data
router.post("/upload-file", saveAsset, uploadFile);
router.post("/build-app", initApp, getOwnedApps);
// update app
router.post("/update-app", requireAdmin, updateApp);
router.post("/update-app-name/:appId", updateLogoWare, updateAppLogo);
router.post("/update-landing-page/:appId", requireAdmin, updateLandingPage);
// building pages
router.post("/add-page", appWare, saveAsset, addPage);
// delete app
router.delete("/delete-app/:appId", requireAdmin, deleteApp);

module.exports = router;
