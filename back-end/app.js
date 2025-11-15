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
const cors = require("cors");
const compression = require("compression");
const http = require("http");
const sequelize = require("./config/db"); // Menggunakan koneksi terpusat
const mqtt = require("mqtt");
const Pengujian = require("./models/pengujian");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Instantiate express
const app = express();

// Enable CORS for all routes
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --- Database Connection Verification ---
sequelize
  .authenticate()
  .then(() => {
    console.log("MariaDB/MySQL connection has been established successfully.");
    return sequelize.sync();
  })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// --- MQTT Client ---
const mqttClient = {
  connectAndSubscribe: () => {
    const options = {
      reconnectPeriod: 1000, // try to reconnect every 1 second
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    };
    const client = mqtt.connect(process.env.MQTT_BROKER_URL, options);

    client.on("connect", () => {
      console.log("Connected to MQTT Broker!");
      client.subscribe(process.env.MQTT_TOPIC, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${process.env.MQTT_TOPIC}`);
        }
      });
    });

    client.on("reconnect", () => {
      console.log("Reconnecting to MQTT Broker...");
    });

    client.on("message", (topic, message) => {
      console.log(
        `Message received from topic ${topic}: ${message.toString()}`
      );
      try {
        const data = JSON.parse(message.toString());
        Pengujian.create(data)
          .then(() => console.log("Successfully saved data to database"))
          .catch((error) =>
            console.error("Failed to save data to database:", error)
          );
      } catch (error) {
        console.error("Error parsing MQTT message or saving to DB:", error);
      }
    });

    client.on("error", (error) => {
      console.error("MQTT Client Error:", error);
      // The client will automatically try to reconnect, so we don't need to end it.
    });
  },
};

// REACT BUILD for production
if (process.env.NODE_ENV === "PROD") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// Initialize routes middleware
app.use("/api/pengujian", require("./routes/pengujian"));

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
