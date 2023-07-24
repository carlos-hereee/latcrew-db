require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
// const route = require("/src/routes");
const { port, clientUrl, clientUrlAlt, uri, isDev } = require("./config.env");

const app = express();
app.use(helmet());
app.use(cors({ credentials: true, origin: [clientUrl, clientUrlAlt] }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: `api is running on ${port}` });
});

app.listen(port, () => {
  console.log("isDev", isDev);
  console.log(`\n\n*** Server listening on port: ${port}`);
});
