const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('todo_app', 'postgres', '0000', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize; 