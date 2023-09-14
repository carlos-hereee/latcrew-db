const saveUser = require("../../db/models/users/saveUser");
const storeCookies = require("../../utils/cookies/storeCookies");
const random = require("../../utils/auth/random");
const generateHash = require("../../utils/auth/generateHash");
const { v4 } = require("uuid");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    // key variables
    const username = req.body.username;
    const email = req.body.email;
    const userId = v4();
    const salt = random();
    // save protect password with hash-encryption
    const password = generateHash(salt, req.body.password);
    const sessionId = generateHash(salt, userId);
    const auth = { salt, password, sessionId, passwordHistory: [password] };
    await saveUser({ userId, email, username, auth });
    // create session cookie
    const { accessToken } = storeCookies(res, username, sessionId);
    res.status(201).json(accessToken).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
