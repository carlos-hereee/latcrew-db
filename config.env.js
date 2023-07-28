module.exports = {
  port: process.env.PORT,
  uri: process.env.MONGOOSE_URI,
  clientUrl: process.env.CLIENT_URL,
  clientUrlAlt: process.env.CLIENT_URL_ALT,
  isDev: process.env.NODE_ENV === "development",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  cookieName: process.env.COOKIE_NAME,
  mongooseUser: process.env.MONGOOSE_USERNAME,
  mongoosePassword: process.env.MONGOOSE_PASSWORD,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  jwtPublicKey: process.env.JWT_PUBLIC_KEY,
};
