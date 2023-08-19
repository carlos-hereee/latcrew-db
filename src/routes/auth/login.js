const saveUser = require("../../db/methods/users/saveUser");
const { random } = require("../../utils/crypto");
const mgs = require("../../data/error.message.json");

module.exports = async (req, res) => {
  // user does not exist in db
  if (!req.user) return res.status(403).send(mgs.userDoesNotExist);
  console.log("req.credentials", req.user);

  // if (session.length > 1) {
  //   console.log("session", session.length);
  //   console.log("session", session[0]);
  // }
  // const { accessToken } = storeCookies(res, username, session.uid);
  // return res.status(200).send({ user, accessToken });
};
