const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  feedback: { type: String, enum: ['👍', '👎', 'neutral'], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);