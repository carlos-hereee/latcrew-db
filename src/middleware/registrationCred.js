const getUser = require("../db/model/users/getUser");

module.exports = async (req, res, next) => {
  const { username, email } = req.body;
  const user = await getUser({ username, email });
  if (user) {
    res.status(400).json({ message: "A user already exists with that username" });
  } else next();
};
