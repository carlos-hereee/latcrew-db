module.exports = (req, res, next) => {
  const appName = req.body.appName;
  // appName must exists
  if (!appName) return res.status(400).json(message.missingCredentials).end();
  next();
};
