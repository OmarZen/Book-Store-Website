// models/Store.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const StoreBook = require('./StoreBook'); // Import StoreBook here

class Store extends Model {}
Store.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  address: DataTypes.STRING,
}, { sequelize, modelName: 'store', timestamps: false });

// Define associations after the model definition
const Book = require('./Book'); // Import Book here
Store.belongsToMany(Book, { through: StoreBook, foreignKey: 'store_id' });

module.exports = Store;
