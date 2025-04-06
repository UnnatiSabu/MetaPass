const express = require('express');
const router = express.Router();
const AppLog = require('../models/AppLog.js');

router.post('/', async (req, res) => {
  try {
    const newLog = new AppLog(req.body);
    await newLog.save();
    res.json({ success: true, message: 'Log saved to MongoDB' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to save log' });
  }
});

// GET /api/log?userId=user123
router.get('/', async (req, res) => {
    try {
      const { userId } = req.query;
      const logs = await AppLog.find(userId ? { userId } : {});
      res.json(logs);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching logs' });
    }
  });

module.exports = router;