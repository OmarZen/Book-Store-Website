// models/StoreBook.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class StoreBook extends Model {}
StoreBook.init({
  store_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'stores', // Should match the model name
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'books', // Should match the model name
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  price: DataTypes.FLOAT,
  sold_out: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, { sequelize, modelName: 'store_book', timestamps: false });

module.exports = StoreBook;
