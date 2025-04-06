const mongoose = require('mongoose');

const deviceStatsSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, index: true },
  model: String,
  manufacturer: String,
  osVersion: String,
  apiLevel: Number,
  timestamp: { type: Date, default: Date.now },
  batteryLevel: Number,
  batteryStatus: String,
  cpuUsage: Number,
  memoryTotal: Number,
  memoryUsed: Number,
  storageTotal: Number,
  storageUsed: Number,
  networkType: String,
  networkStrength: Number,
  screenResolution: String,
  screenBrightness: Number,
  runningApps: [String],
  location: {
    latitude: Number,
    longitude: Number,
    accuracy: Number
  }
});

module.exports = mongoose.model('DeviceStats', deviceStatsSchema);