const router = require("express").Router();
const { getApp, requireApp } = require("../../middleware/app");
const saveAsset = require("../../middleware/app/saveAsset");
const { requireUser } = require("../../middleware/auth");
const addPage = require("./addPage");
const deleteApp = require("./deleteApp");
const initApp = require("./initApp");
const latest = require("./getApp/latest");
const updateApp = require("./updateApp/app");
const getAppWithName = require("./getApp/getAppWithName");
const updateAppName = require("../../middleware/app/matchName");
const updateLandingPage = require("./updateApp/landingPage");
const requireAdmin = require("../../middleware/app/requireAdmin");
const uploadSingle = require("../../utils/multer/uploadSingle");
const updateAppLogo = require("./updateApp/appLogo");
const initAppLogo = require("../../middleware/app/initAppLogo");
const requireUniqueName = require("../../middleware/app/requireUniqueName");
const getAllApps = require("./getApp/getAllApps");
const getUserWithId = require("../../middleware/auth/getUserWithId");
// one liner
const appWare = [getApp, requireApp];
const updateLogoWare = [requireAdmin, uploadSingle("logo"), updateAppName];
const initAppWare = [requireUser, uploadSingle("logo"), requireUniqueName];
// load app data
router.get("/all-apps", getAllApps);
router.get("/:appName", requireUser, getAppWithName);
router.get("/latest/:appId", requireUser, latest);
// build app data
router.post("/init-app", initAppWare, initAppLogo, initApp, getUserWithId);
// update app
router.post("/update-app", requireAdmin, updateApp);
router.post("/update-app-name/:appId", updateLogoWare, updateAppLogo);
router.post("/update-landing-page/:appId", requireAdmin, updateLandingPage);
// building pages
router.post("/add-page", appWare, saveAsset, addPage);
// delete app
router.delete("/delete-app/:appId", deleteApp, getUserWithId);

module.exports = router;
