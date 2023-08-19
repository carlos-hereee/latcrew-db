// const saveUser = require("../../db/methods/users/saveUser");
const mgs = require("../../data/error.message.json");
const generateHash = require("../../utils/auth/generateHash");
const random = require("../../utils/auth/random");

module.exports = async (req, res) => {
  const { password } = req.body;
  const reqUser = req.user;
  // user does not exist in db
  if (!reqUser) return res.status(403).send(mgs.userDoesNotExist);
  const salt = random();
  const expectedHash = generateHash(reqUser.authentication.salt, password);
  console.log("req.credentials", reqUser);
  if (reqUser.authentication.password !== expectedHash) {
    return res.status(403).send(mgs.invalidCredentails);
  }
  const sessionToken = generateHash(salt, req.user.userId);
  console.log("sessionToken", sessionToken);
  // if (session.length > 1) {
  //   console.log("session", session.length);
  //   console.log("session", session[0]);
  // }
  // const { accessToken } = storeCookies(res, username, session.uid);
  // return res.status(200).send({ user, accessToken });
};
