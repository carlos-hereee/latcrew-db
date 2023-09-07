const upload = require("../../utils/multer/uploadSingle");

module.exports = async (req, res, next) => {
  // const multer = await upload.array(req.body.files);
  console.log("multer", multer);
  next();
};
