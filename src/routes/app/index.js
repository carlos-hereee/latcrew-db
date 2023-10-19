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
// const updateAppName = require("../../middleware/app/updateAppName");
const updateLandingPage = require("./updateApp/landingPage");
const validateAdmin = require("../../middleware/app/validateAdmin");
const uploadSingle = require("../../utils/multer/uploadSingle");
const updateAppLogo = require("./updateApp/appLogo");
const initAppLogo = require("../../middleware/app/initAppLogo");
const requireUniqueName = require("../../middleware/app/requireUniqueName");
const getAllApps = require("./getApp/getAllApps");
const requireAppName = require("../../middleware/app/requireAppName");
// one liner
const appWare = [getApp, requireApp];
const logoWare = [requireUser, uploadSingle("logo")];
const initAppWare = [requireAppName, requireUniqueName];
const appRemovalWare = [requireUser, validateAdmin];

// load app data
router.get("/all-apps", getAllApps);
router.get("/:appName", requireUser, getAppWithName);
router.get("/latest/:appId", requireUser, latest);
// build app data
router.post("/init-app/:appName", logoWare, initAppWare, initAppLogo, initApp);
// update app
router.post("/update-app", validateAdmin, updateApp);
router.post("/update-app-name/:appId", logoWare, updateAppLogo);
router.post("/update-landing-page/:appId", validateAdmin, updateLandingPage);
// building pages
router.post("/add-page", appWare, saveAsset, addPage);
// delete app
router.delete("/delete-app/:appId", appRemovalWare, deleteApp);

module.exports = router;
