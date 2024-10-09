const express = require('express');
const sequelize = require('./config/database');
const Store = require('./models/Store');
const Book = require('./models/Book');
const Author = require('./models/Author');
const StoreBook = require('./models/StoreBook');

// Set up relationships
Book.belongsTo(Author, { foreignKey: 'author_id' });
Store.belongsToMany(Book, { through: StoreBook, foreignKey: 'store_id' });
Book.belongsToMany(Store, { through: StoreBook, foreignKey: 'book_id' });

const app = express();
app.use(express.json());

// No need to force sync since tables are already created
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the MySQL database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
