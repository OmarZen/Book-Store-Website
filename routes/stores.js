// routes/stores.js
const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

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

module.exports = router;
