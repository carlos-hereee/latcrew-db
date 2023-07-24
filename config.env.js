module.exports = {
  port: process.env.PORT,
  uri: process.env.MONGOOSE_URI,
  clientUrl: process.env.CLIENT_URL,
  clientUrlAlt: process.env.CLIENT_URL_ALT,
  isDev: process.env.NODE_ENV,
};
