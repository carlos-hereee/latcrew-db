const multer = require("multer");

module.exports = multer.diskStorage({
  // where should files be stored on disk
  destination: (req, file, cb) => cb(null, "public"),
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, Date.now() + "-" + originalname);
  },
  fileFilter: (req, file, cb) => {
    const safeFiles = ["png", "image/svg+xml", "jpg"];
    // to refect file pass 'false' or pass an error
    console.log("fileFilter", file);
    if (!safeFiles.includes(file.minetype)) {
      cb(new Error("forbideen file type"));
      // to accept pass true
    } else cb(null, true);
  },
});
