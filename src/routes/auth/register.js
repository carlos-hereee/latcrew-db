const saveUser = require("../../db/methods/users/saveUser");
const { random, authentication } = require("../../utils/crypto");

module.exports = async (req, res) => {
  // const { email, username, password } = req.body;
  console.log("req.body", req.body);
  console.log("req.user", req.user);
  // const salt = random();
  // const user = await saveUser({
  //   email,
  //   username,
  //   authentication: { salt, password: authentication(salt, password) },
  // });
  return res.status(200).send(user);
};
