const DeviceStats = require('../models/DeviceStats');

const cleanupOldData = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const result = await DeviceStats.deleteMany({ timestamp: { $lt: thirtyDaysAgo } });
    console.log(`🧹 Cleaned up ${result.deletedCount} old records`);
  } catch (err) {
    console.error('❌ Error during cleanup:', err.message);
  }
};

module.exports = cleanupOldData;