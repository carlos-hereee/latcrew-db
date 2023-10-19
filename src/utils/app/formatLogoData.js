const { baseUrl } = require("../../../config.env");

module.exports = (appName, file) => {
  return {
    file,
    heading: appName,
    title: appName,
    // TODO: compress image for faster loading
    small: `${baseUrl}/${file.path}`,
    url: `${baseUrl}/${file.path}`,
    alt: "Industry brand",
  };
};
