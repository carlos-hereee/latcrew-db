const { port } = require("../../config.env");
const authRoute = require("./auth");

module.exports = (app) => {
  // initial test route
  app.get("/", (req, res) => {
    res.status(200).json({ message: `api is running on ${port}` });
  });
  // authentication route for login and access/refresh tokens
  app.use("/auth/", authRoute);
};
