const usePublicUserData = require("../../utils/auth/usePublicUserData");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const generateHash = require("../../utils/auth/generateHash");

module.exports = (req, res) => {
  try {
    // const user = usePublicUserData(req.user);
    // res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
