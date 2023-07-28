const userRoute = require("./user");

const routes = (app) => {
  // initial test route
  app.get("/", (req, res) => {
    res.status(200).json({ message: `api is running on ${port}` });
  });
  app.use("/users/", userRoute);
};
module.exports = routes;
