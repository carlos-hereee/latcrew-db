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
const { validateUser, requireUser, verifyUser } = require("../../middleware/auth");
const { validatePassword } = require("../../middleware/auth");
// one liners
const validateWare = [validateUser, requireUser, validatePassword];

// get
router.get("/", requireUser, userRoute);
router.get("/:userId", requireUser, userWithIdRoute);
// post
router.post("/register", validateUser, verifyUser, register);
router.post("/login", validateWare, login);
router.post("/refresh-token", requireUser, refreshToken);
// put
router.post("/change-password", validateWare, changePassword);
// log out
router.delete("/logout", requireUser, logout);

module.exports = router;
