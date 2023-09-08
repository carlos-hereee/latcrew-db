const multer = require("multer");

module.exports = multer.diskStorage({
  // where should files be stored on disk
  destination: (req, file, cb) => cb(null, "public"),
  filename: (req, file, cb) => {
    const { filename, fieldname } = file;
    const { appId } = req.user;
    // custom file name on uploads folder
    let fileName = filename ? `${filename}-${appId}` : `${fieldname}-${appId}`;
    cb(null, fileName + "-" + Date.now());
  },
  fileFilter: (req, file, cb) => {
    // to refect file pass 'false' or pass an error
    if (minetype !== "text/yaml" || minetype !== "text/x-yaml") {
      cb(new Error("forbideen file type"));
      // to accept pass true
    } else cb(null, true);
  },
});
