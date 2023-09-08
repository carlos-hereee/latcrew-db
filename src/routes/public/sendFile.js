const path = require("path");

module.exports = (req, res) => {
  const filePath = path.resolve() + `/public/${req.params.assetId}`;
  // const fileStatus = fs.
  console.log("filePath", filePath);
  // res.sendFile(filePath);
};
