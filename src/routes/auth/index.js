const router = require("express").Router();
// routes
const register = require("./register");
const userRoute = require("./userRoute");
const getWithUsername = require("./getWithUsername");
const refreshToken = require("./refreshToken");
const login = require("./login");
const logout = require("./logout");
const changePassword = require("./changePassword");
// custom middleware
const { validateUser, requireUser, authenticateUser } = require("../../middleware/auth");
const { validatePassword } = require("../../middleware/auth");
const forgotPassword = require("./forgotPassword");
// one liners
const validateWare = [validateUser, requireUser, validatePassword];
const userWare = [validateUser, requireUser];

// get
router.get("/", requireUser, userRoute);
// TODO: ADD ADDITIONAL VERFICATION METHODS
router.get("/user/:username", userWare, getWithUsername);
// post
router.post("/register", validateUser, authenticateUser, register);
router.post("/login", validateWare, login);
router.post("/refresh-token", requireUser, refreshToken);
// put
router.post("/change-password", validateWare, changePassword);
router.post("/forgot-password", validateUser, requireUser, forgotPassword);
// log out
router.delete("/logout", requireUser, logout);

module.exports = router;
