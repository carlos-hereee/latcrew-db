const usePublicUserData = require("../../utils/auth/usePublicUserData");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    // const { username } = req.params;
    // // TODO: ADD ADDITIONAL VERFICATION METHODS

    const data = usePublicUserData(req.user);
    res.status(200).json(data).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
