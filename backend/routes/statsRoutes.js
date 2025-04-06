const express = require('express');
const router = express.Router();
const { submitStats, getStats } = require('../controllers/statsController');

// POST route
router.post('/submit', submitStats);

// GET route
router.get('/all', getStats);

module.exports = router;