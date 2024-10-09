// commands/fillDatabase.js
const fs = require('fs');
const csv = require('csv-parser');
const Author = require('../models/Author');
const Book = require('../models/Book');
const Store = require('../models/Store');
const StoreBook = require('../models/StoreBook');
const sequelize = require('../config/database');

async function fillDatabase(filePath) {
  const authors = {};
  
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        // Process authors first
        const authorName = row.author;

        if (!authors[authorName]) {
          const author = await Author.create({ name: authorName });
          authors[authorName] = author.id; // Store author ID for reference
        }

        // Process stores
        const storeName = row.store_name;
        const storeAddress = row.store_address;

        // Check if the store already exists, and if not, create it
        let store = await Store.findOne({ where: { name: storeName, address: storeAddress } });
        if (!store) {
          store = await Store.create({ name: storeName, address: storeAddress });
        }

        // Create the book
        const book = await Book.create({
          name: row.book_name,
          pages: parseInt(row.book_pages, 10),  // Ensure pages is an integer
          author_id: authors[authorName], // Reference to the author
        });

        // Create the relationship in the StoreBook join table
        await StoreBook.create({
          store_id: store.id,
          book_id: book.id,
          price: parseFloat(row.store_price_for_book), // Ensure price is a float
          sold_out: false // or use row.sold_out if you have this in your CSV
        });        
      } catch (error) {
        console.error('Error processing row:', row, error);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed and database filled');
    });
}

// Example of how to use this function
const filePath = './Sample Data for Bookstore.csv';  // Change this to your CSV file path
sequelize.sync().then(() => {
  fillDatabase(filePath);
});
