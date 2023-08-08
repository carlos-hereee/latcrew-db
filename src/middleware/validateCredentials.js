const msg = require("../data/error.message.json");
const getUser = require("../db/model/users/getUser");
const hashPassword = require("../utils/hashPassword");
const isPasswordMatch = require("../utils/isPasswordMatch");

module.exports = async (req, res, next) => {
  const { username, oldPassword, newPassword } = req.body;
  const [user] = await getUser({ username });
  // if user does not exists in db
  if (!user) return res.status(404).send(msg.userDoesNotExist);
  const { hashedPassword, uid } = user;
  // verify previous password
  const { error } = isPasswordMatch({ password: oldPassword, hashedPassword });
  if (!error) req.user = user;
  if (error.status === 401 && newPassword) {
    req.credentials = { username, hashedPassword: hashPassword(newPassword, 10), uid };
  }
  if (error.status === 403) {
    return res.status(error.status).send(error);
  }
  next();
};
