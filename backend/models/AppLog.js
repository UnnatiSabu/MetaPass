const mongoose = require('mongoose');

const appLogSchema = new mongoose.Schema({
  userId: String,
  packageName: String,
  permissions: [String],
  cookies: Boolean,
  trackers: Number,
  score: Number,
  verdict: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AppLog', appLogSchema);