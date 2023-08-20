const router = require("express").Router();
// custom middleware
const requireUser = require("../../middleware/requireUser");
// routes
const register = require("./register");
const userRoute = require("./userRoute");
const userWithIdRoute = require("./userWithIdRoute");
const refreshToken = require("./refreshToken");
const login = require("./login");
const logout = require("./logout");
const changePassword = require("./changePassword");
const validateUser = require("../../middleware/auth/validateUser");
const validatePassword = require("../../middleware/auth/validatePassword");
const verifyCredentials = require("../../middleware/auth/verifyCredentials");

const validateWare = [verifyCredentials, validateUser, requireUser, validatePassword];
const credentialWare = [verifyCredentials, validateUser];

// get
router.get("/", requireUser, userRoute);
router.get("/:userId", requireUser, userWithIdRoute);
// post
router.post("/register", credentialWare, register);
router.post("/login", validateWare, login);
router.post("/refresh-token", requireUser, refreshToken);
// put
router.put("/change-password", validateWare, changePassword);
// log out
router.delete("/logout", requireUser, logout);

module.exports = router;
