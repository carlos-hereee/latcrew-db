const usePublicUserData = require("../../utils/auth/usePublicUserData");

module.exports = async (req, res) => {
  const user = usePublicUserData(req.user);
  res.status(200).json(user).end();
};
