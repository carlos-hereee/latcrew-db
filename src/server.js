require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const routes = require("./routes");
const connectMongoose = require("./db/connectMongoose");
const { clientUrl, clientUrlAlt } = require("../config.env");
const { deserializeUser } = require("./middleware/auth");

// create an express app
const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: [clientUrl, clientUrlAlt] }));

// middleware for all functions
app.use(deserializeUser);

const main = () => {
  connectMongoose(app);
  routes(app);
};

// init app
main();
