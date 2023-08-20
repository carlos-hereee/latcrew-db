// const saveUser = require("../../db/methods/users/saveUser");
const mgs = require("../../data/error.message.json");
const generateHash = require("../../utils/auth/generateHash");
const random = require("../../utils/auth/random");

module.exports = async (req, res) => {
  const { sessionId, userId } = req.user;
  // create new session cookie
  const salt = random();
  const id = generateHash(salt, userId);
  console.log("id", id);
  // console.log(await reqUser.save());
  // res.cookie("accessToken", reqUser.sessionId, {domain:"localhost",  })

  console.log("sessionId", sessionId);
  // if (session.length > 1) {
  //   console.log("session", session.length);
  //   console.log("session", session[0]);
  // }
  // const { accessToken } = storeCookies(res, username, session.uid);
  // return res.status(200).send({ user, accessToken });
};
