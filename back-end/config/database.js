const { Sequelize } = require("sequelize");

// TODO: Replace with your actual database credentials
const sequelize = new Sequelize(
  "nama_database_anda",
  "user_anda",
  "password_anda",
  {
    host: "localhost",
    dialect: "mysql", // or 'mariadb'
    logging: false, // Set to console.log to see SQL queries
  }
);

module.exports = sequelize;
