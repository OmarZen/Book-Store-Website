// routes/stores.js
const express = require('express');
const router = express.Router();
const Store = require('../models/Store');
const Book = require('../models/Book');
const StoreBook = require('../models/StoreBook');
const Author = require('../models/Author'); // Import Author model

// Get all stores
router.get('/', async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching stores.' });
    }
});

// Create a new store
router.post('/', async (req, res) => {
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ error: 'Name and address are required.' });
    }

    try {
        const store = await Store.create({ name, address });
        res.status(201).json(store);
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(400).json({ error: 'Failed to create store.' });
    }
});

// Update an existing store by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ error: 'Name and address are required.' });
    }

    try {
        const [updated] = await Store.update({ name, address }, { where: { id } });
        if (updated) {
            const updatedStore = await Store.findOne({ where: { id } });
            return res.status(200).json(updatedStore);
        }
        throw new Error('Store not found');
    } catch (error) {
        console.error('Error updating store:', error);
        res.status(400).json({ error: 'Failed to update store.' });
    }
});

// Delete a store by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Store.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).send();
        }
        throw new Error('Store not found');
    } catch (error) {
        console.error('Error deleting store:', error);
        res.status(400).json({ error: 'Failed to delete store.' });
    }
});

// Get all stores with their books and authors
router.get('/all', async (req, res) => {
    try {
      const stores = await Store.findAll({
        include: [
          {
            model: Book,
            through: {
              model: StoreBook,
              attributes: ['price'], // Get price from StoreBook
            },
            include: {
              model: Author,
              attributes: ['name'], // Get the author's name
            },
          },
        ],
      });
  
      // Check if stores are found
      if (!stores || stores.length === 0) {
        return res.status(404).json({ message: 'No stores found.' });
      }
  
      // Construct response data
      const responseData = stores.map(store => ({
        storeName: store.name,
        books: store.books.map(book => ({
          id: book.id, // Book ID
          title: book.name, // Book Title
          author: book.author.name, // Author Name
          price: book.store_book.price, // Price
        })),
      }));
  
      res.json(responseData);
      console.log('Stores with books fetched successfully.');
    } catch (error) {
      console.error('Error fetching stores with books:', error);
      res.status(500).json({ error: 'Failed to fetch stores with books.' });
    }
  });

module.exports = router;
