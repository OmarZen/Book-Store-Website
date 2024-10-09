// models/Store.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Store extends Model {}
Store.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  address: DataTypes.STRING,
}, { sequelize, modelName: 'store', timestamps: false });  // Disable timestamps

module.exports = Store;
