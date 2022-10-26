const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./dbconnect");
const user = require("./Routes/user");
const app = express();
const CONSTANTS = require("./constants");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

  app.use(bodyParser.json()) ;
  app.use("/", user);
  
  app.get("/ping", (req, res) => {
    res.json({
      ping: "pokemon"
    });
  });


  const server = app.listen(CONSTANTS.APP_PORT, () => {
    console.log(`Server is running at port ${CONSTANTS.APP_PORT}`);
    if (process.env.NODE_ENV != 'test') {
      connectDB();
    }
  });

  module.exports = { app, server };
