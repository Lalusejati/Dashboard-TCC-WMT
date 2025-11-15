const { Sequelize } = require("sequelize");

// TODO: Replace with your actual database credentials
const sequelize = new Sequelize("simari_db", "root", "676757", {
  host: "localhost",
  dialect: "mysql", // or 'mariadb'
  logging: false, // Set to console.log to see SQL queries
});

module.exports = sequelize;
