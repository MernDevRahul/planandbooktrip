const express = require('express');
const router = express.Router();
const queryController = require('../../controllers/queryController/queryController');

// Create a new query
router.post('/queries', queryController.createQuery);

// Get all queries
router.get('/queries', queryController.getAllQueries);

// Get a specific query by ID
router.get('/queries/:id', queryController.getQueryById);

// Update a query
router.put('/queries/:id', queryController.updateQuery);

// Delete a query
router.delete('/queries/:id', queryController.deleteQuery);

module.exports = router;
