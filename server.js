require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const helmet = require("helmet");
const userRoute = require("./src/routes/user");
const { port, clientUrl, clientUrlAlt, uri, isDev } = require("./config.env");

const app = express();
app.use(helmet());
app.use(cors({ credentials: true, origin: [clientUrl, clientUrlAlt] }));
app.use(express.json());
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: `api is running on ${port}` });
});

app.listen(port, () => {
  if (isDev) {
    console.log(`\n\n*** Server listening on port: ${port} ***\n`);
  }
});
