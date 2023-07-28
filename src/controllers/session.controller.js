const getUser = require("../db/model/getUser");
const msg = require("../data/error.message.json");

module.exports = async (req, res) => {
  const { email, password, username } = req.body;
  const user = getUser({ email, username });
  if (!user || user.password !== password) {
    return res.status(401).send(msg.invalidEmailOrPassword);
  }

  const session = createSession(email || username);
  const accessToken = signJWT();
};
