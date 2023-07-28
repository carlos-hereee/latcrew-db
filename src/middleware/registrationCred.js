const Users = require("../db/mongoose/schema/user");

module.exports = async (req, res, next) => {
  const { username, email } = req.body;
  const user = await Users.find({
    or: [{ username }, { email: username }, { email }],
  });
  if (user.filter((i) => i.uid)[0].uid) {
    res.status(400).json({ message: "A user already exists with that username" });
  } else next();
};
