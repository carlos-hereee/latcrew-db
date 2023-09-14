const multer = require("multer");

module.exports = multer.diskStorage({
  // where should files be stored on disk
  destination: (req, file, cb) => cb(null, "public"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  fileFilter: (req, file, cb) => {
    const safeFiles = ["png", "image/svg+xml", "jpg"];
    //  refect file that are not safe pass 'false' or pass an error
    !safeFiles.includes(file.minetype)
      ? cb(new Error("forbideen file type"))
      : cb(null, true);
  },
});
