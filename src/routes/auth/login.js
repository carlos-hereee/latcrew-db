// const saveUser = require("../../db/methods/users/saveUser");
const mgs = require("../../data/error.message.json");
const generateHash = require("../../utils/auth/generateHash");
const random = require("../../utils/auth/random");

module.exports = async (req, res) => {
  const { password } = req.body;
  const reqUser = req.user;
  const expectedHash = generateHash(reqUser.salt, password);
  console.log("expectedHash", expectedHash === reqUser.password);
  // incorrect password
  if (reqUser.password !== expectedHash) {
    return res.status(403).send(mgs.invalidCredentails);
  }
  // create new session cookie
  const salt = random();
  reqUser.sessionId = generateHash(salt, req.user.userId);
  console.log(await reqUser.save());
  // res.cookie("accessToken", reqUser.sessionId, {domain:"localhost",  })

  console.log("sessionId", sessionId);
  // if (session.length > 1) {
  //   console.log("session", session.length);
  //   console.log("session", session[0]);
  // }
  // const { accessToken } = storeCookies(res, username, session.uid);
  // return res.status(200).send({ user, accessToken });
};
