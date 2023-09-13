const multer = require("multer");

module.exports = multer.diskStorage({
  // where should files be stored on disk
  destination: (req, file, cb) => cb(null, "public"),
  filename: (req, file, cb) => {
    // custom id
    const heroId = Date.now() + "-" + file.originalname;
    req.hero = { heroId };
    cb(null, heroId);
  },
  fileFilter: (req, file, cb) => {
    const safeFiles = ["png", "image/svg+xml", "jpg"];
    // to refect file pass 'false' or pass an error
    if (!safeFiles.includes(file.minetype)) {
      cb(new Error("forbideen file type"));
      // to accept pass true
    } else {
      // console.log("safeFiles", safeFiles);
      cb(null, true);
    }
  },
});
