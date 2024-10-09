// routes/authors.js
const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// Get all authors
router.get('/', async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching authors.' });
    }
});

// Create a new author
router.post('/', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required.' });
    }

    try {
        const author = await Author.create({ name });
        res.status(201).json(author);
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(400).json({ error: 'Failed to create author.' });
    }
});

// Update an existing author by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required.' });
    }

    try {
        const [updated] = await Author.update({ name }, { where: { id } });
        if (updated) {
            const updatedAuthor = await Author.findOne({ where: { id } });
            return res.status(200).json(updatedAuthor);
        }
        throw new Error('Author not found');
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(400).json({ error: 'Failed to update author.' });
    }
});

// Delete an author by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Author.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).send();
        }
        throw new Error('Author not found');
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(400).json({ error: 'Failed to delete author.' });
    }
});

module.exports = router;
