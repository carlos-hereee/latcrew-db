const { port } = require("../../config.env");
const authRoute = require("./auth");
const appRoute = require("./app");
const calendarRoute = require("./calendar");

module.exports = (app) => {
  // initial test route
  app.get("/", (req, res) => {
    const message = `api is running on ${port}`;
    res.status(200).json(message).end();
  });
  // authentication route for login and access/refresh tokens
  app.use("/auth/", authRoute);
  // app data
  app.use("/app/", appRoute);
  app.use("/calendar/", calendarRoute);
};
