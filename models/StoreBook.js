// models/StoreBook.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Store = require('./Store');
const Book = require('./Book');

class StoreBook extends Model {}
StoreBook.init({
  store_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Store,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  price: DataTypes.FLOAT,
  sold_out: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, { sequelize, modelName: 'store_book', timestamps: false });  // Disable timestamps

module.exports = StoreBook;
