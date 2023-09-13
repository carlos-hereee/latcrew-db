const generateValidUserData = require("../../utils/auth/generateValidUserData");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = (req, res) => {
  try {
    // console.log("req.body", req.body);
    const user = generateValidUserData(req.user);
    res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
