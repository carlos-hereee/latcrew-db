const multer = require("multer");

module.exports = multer.diskStorage({
  // where should files be stored on disk
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    // custom file name on uploads folder
    let fileName = file.filename
      ? `${file.filename}-${req.user.appId}`
      : `${file.fieldname}-${req.user.appId}`;
    cb(null, fileName + "-" + Date.now());
  },
  fileFilter: (req, file, cb) => {
    // to refect file pass 'false' or pass an error
    if (file.minetype !== "text/yaml" || file.minetype !== "text/x-yaml") {
      cb(new Error("forbideen file type"));
      // to accept pass true
    } else cb(null, true);
  },
});
