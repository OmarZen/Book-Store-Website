// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching books.' });
    }
});

// Create a new book
router.post('/', async (req, res) => {
    const { name, pages, author_id } = req.body; // Destructure the incoming data

    // Validation
    if (!name || !pages || !author_id) {
        return res.status(400).json({ error: 'All fields are required: name, pages, and author_id.' });
    }

    try {
        const book = await Book.create({
            name,
            pages: parseInt(pages, 10),  // Ensure pages is an integer
            author_id: parseInt(author_id, 10), // Ensure author_id is an integer
        });
        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(400).json({ error: 'Failed to create book.' });
    }
});

// Update an existing book by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get the book ID from the URL
    const { name, pages, author_id } = req.body;

    try {
        const [updated] = await Book.update(
            { name, pages, author_id },
            { where: { id } }
        );

        if (updated) {
            const updatedBook = await Book.findOne({ where: { id } });
            return res.status(200).json(updatedBook);
        }
        throw new Error('Book not found');
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(400).json({ error: 'Failed to update book.' });
    }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the book ID from the URL

    try {
        const deleted = await Book.destroy({
            where: { id }
        });

        if (deleted) {
            return res.status(204).send();
        }
        throw new Error('Book not found');
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(400).json({ error: 'Failed to delete book.' });
    }
});


module.exports = router;
