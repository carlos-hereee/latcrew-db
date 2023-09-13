const usePublicUserData = require("../../utils/auth/usePublicUserData");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = (req, res) => {
  try {
    // console.log("req.body", req.body);
    const user = usePublicUserData(req.user);
    res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
