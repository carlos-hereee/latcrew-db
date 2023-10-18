const router = require("express").Router();
const { getApp, requireApp } = require("../../middleware/app");
const saveAsset = require("../../middleware/app/saveAsset");
const { requireUser } = require("../../middleware/auth");
const addPage = require("./addPage");
const deleteApp = require("./deleteApp");
const initApp = require("./initApp");
const latest = require("./getApp/latest");
const updateApp = require("./updateApp/app");
const getOwnedApps = require("./getApp/getOwnedApps");
const getAppWithName = require("./getApp/getAppWithName");
const updateAppName = require("../../middleware/app/matchName");
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
// build app data
router.post("/build-app", initApp, getOwnedApps);
// update app
router.post("/update-app", requireAdmin, updateApp);
router.post("/update-app-name/:appId", updateLogoWare, updateAppLogo);
router.post("/update-landing-page/:appId", requireAdmin, updateLandingPage);
// building pages
router.post("/add-page", appWare, saveAsset, addPage);
// delete app
router.delete("/delete-app/:appId", deleteApp);

module.exports = router;
