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
const validateSession = require("../../middleware/auth/validateSession");

const authMiddleWare = [validateUser, validatePassword, validateSession];

// get
router.get("/", requireUser, userRoute);
router.get("/:userId", requireUser, userWithIdRoute);
// post
router.post("/register", validateUser, register);
router.post("/login", authMiddleWare, login);
router.post("/refresh-token", requireUser, refreshToken);
// put
router.put("/change-password", authMiddleWare, changePassword);
// log out
router.delete("/logout", requireUser, logout);

module.exports = router;
