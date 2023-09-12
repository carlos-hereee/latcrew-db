const router = require("express").Router();
// routes
const register = require("./register");
const userRoute = require("./userRoute");
const userWithIdRoute = require("./userWithIdRoute");
const refreshToken = require("./refreshToken");
const login = require("./login");
const logout = require("./logout");
const changePassword = require("./changePassword");
// custom middleware
const { verifyCredentials, validateUser, requireUser } = require("../../middleware/auth");
const { validatePassword, verifyUser } = require("../../middleware/auth");
// one liners
const validateWare = [verifyCredentials, validateUser, requireUser, validatePassword];
const credentialWare = [verifyCredentials, validateUser];

// get
router.get("/", requireUser, userRoute);
router.get("/:userId", requireUser, userWithIdRoute);
// post
router.post("/register", [...credentialWare, verifyUser], register);
router.post("/login", validateWare, login);
router.post("/refresh-token", requireUser, refreshToken);
// put
router.put("/change-password", validateWare, changePassword);
// log out
router.delete("/logout", requireUser, logout);

module.exports = router;
