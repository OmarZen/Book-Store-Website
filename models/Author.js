// models/Author.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Author extends Model {}
Author.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
}, { sequelize, modelName: 'author', timestamps: false });  // Disable timestamps

module.exports = Author;
