const getUser = require("../../db/models/users/getUser");
const usePublicUserData = require("../../utils/auth/usePublicUserData");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    // const { username } = req.params;
    // // TODO: ADD ADDITIONAL VERFICATION METHODS
    // const user = await getUser({ username });
    // if (!user) return res.status(404).json();

    const data = usePublicUserData(req.user);
    res.status(200).json(usePublicUserData(data)).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
