// Example controller
const DeviceStats = require('../models/DeviceStats');

// Submit stats
const submitStats = async (req, res) => {
  try {
    const stats = new DeviceStats(req.body);
    await stats.save();
    res.status(201).json({ message: 'Stats saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save stats' });
  }
};

// Get all stats
const getStats = async (req, res) => {
  try {
    const stats = await DeviceStats.find();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

module.exports = {
  submitStats,
  getStats,
};