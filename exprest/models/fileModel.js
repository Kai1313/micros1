// fileModel.js

const { DataTypes } = require('sequelize');
const db = require('../db'); // Assuming you have a database connection module

const TFile = db.define('t_file', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  internalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  batch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workorder: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sequence: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = TFile;
