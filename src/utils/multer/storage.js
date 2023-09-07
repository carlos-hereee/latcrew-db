const multer = require("multer");

module.exports = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    // where should files be stored on disk
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // set the file name on uploads folder
    cb(null, file.filename + "-" + Date.now());
  },
  fileFilter: (req, file, cb) => {
    // set
    if (file.minetype !== "text/yaml" || file.minetype !== "text/x-yaml") {
      // to refect file pass 'false' or pass an error
      cb(new Error("forbideen file type"));
      // to accept pass true
    } else cb(null, true);
  },
});
