// config/database.js
const { Sequelize } = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,    // Database name
  process.env.DB_USER,    // Database username
  process.env.DB_PASS,    // Database password
  {
    host: process.env.DB_HOST,   // Database host
    port: process.env.DB_PORT || 3306,  // MySQL port
    dialect: 'mysql',            // We are using MySQL
    logging: false,              // Disable Sequelize logging
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the MySQL database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
