// db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expresstest', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // Other Sequelize options, such as logging, etc.
});

module.exports = sequelize;
