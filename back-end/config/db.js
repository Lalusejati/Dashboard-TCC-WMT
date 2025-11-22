const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Memuat variabel lingkungan dari file .env di direktori root back-end
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

// Inisialisasi koneksi Sequelize ke TiDB Cloud
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    // dialectOptions: {
    //   // Konfigurasi SSL untuk koneksi aman ke TiDB Cloud
    //   ssl: {
    //     ca: fs.readFileSync(path.join(__dirname, "..", "ca.pem")),
    //   },
    // },
    logging: false, // Matikan logging SQL query di konsol
  }
);

module.exports = sequelize;
