require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { port, clientUrl, clientUrlAlt } = require("../config.env");
const routes = require("./routes");
const connectMongoose = require("./db/mongoose/connectMongoose");

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: [clientUrl, clientUrlAlt] }));

const main = () => {
  connectMongoose(app);
  routes(app);
};

main();
