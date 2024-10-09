// models/Book.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Author = require('./Author');

class Book extends Model {}
Book.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  pages: DataTypes.INTEGER,
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Author,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, { sequelize, modelName: 'book', timestamps: false });

// Define associations after the model definition
Book.belongsTo(Author, { foreignKey: 'author_id' });

module.exports = Book;
