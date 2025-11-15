/* eslint-disable max-len */
/* !

=========================================================
* Argon React NodeJS - v1.0.0
=========================================================

* Product Page: https://argon-dashboard-react-nodejs.creative-tim.com/
* Copyright 2020 Creative Tim (https://https://www.creative-tim.com//)
* Copyright 2020 ProjectData (https://projectdata.dev/)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react-nodejs/blob/main/README.md)

* Coded by Creative Tim & ProjectData

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors"); // Import cors

const sequelize = require("./config/database"); // Import sequelize connection
const compression = require("compression");
const http = require("http");
const crons = require("./config/crons");
const mqttClient = require("./config/mqtt"); // Import MQTT client
const Pengujian = require("./models/pengujian");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Instantiate express
const app = express();

// Enable CORS for all routes
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Start MQTT client
// mqttClient.connectAndSubscribe(); // Will be started with the server

// Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("MariaDB/MySQL connection has been established successfully.");
    // Sync all models
    return sequelize.sync();
  })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// REACT BUILD for production
if (process.env.NODE_ENV === "PROD") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// Initialize routes middleware
app.use("/api/pengujian", require("./routes/pengujian"));

// run at 3:10 AM -> delete old tokens
// const tokensCleanUp = new CronJob("10 3 * * *", function () {
//   crons.tokensCleanUp();
// });
// tokensCleanUp.start();

const PORT = process.env.PORT || 5100;

http.createServer({}, app).listen(PORT, function () {
  console.log(
    "App listening on port " + PORT + "! Go to http://localhost:" + PORT + "/"
  );
  // Start MQTT client after server starts
  mqttClient.connectAndSubscribe();
});

// FOR HTTPS ONLY
// https.createServer({
//   key: fs.readFileSync(process.env.SSLKEY),
//   cert: fs.readFileSync(process.env.SSLCERT),
// }, app)
//     .listen(PORT, function() {
//       console.log('App listening on port ' + PORT + '! Go to https://localhost:' + PORT + '/');
//     });
// app.use(requireHTTPS); FOR HTTPS
// app.enable('trust proxy');
// app.use(function(req, res, next) {
//   if (req.secure) {
//     return next();
//   }
//   res.redirect('https://' + req.headers.host + req.url);
// });

/**
 * @param {int} req req.
 * @param {int} res res.
 * @param {int} next next.
 * @return {void} none.
 */
function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
