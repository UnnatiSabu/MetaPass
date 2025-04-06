// routes/admin.js
const express = require('express');
const router = express.Router();
const { updateMalwareDB } = require('../controllers/adminController');

router.post('/update-malware-db', updateMalwareDB);

module.exports = router;