// controllers/feedbackController.js
const fs = require('fs');
const path = require('path');

const feedbackPath = path.join(__dirname, '..', 'feedbackStore.json');

function loadFeedback() {
  try {
    return JSON.parse(fs.readFileSync(feedbackPath, 'utf-8'));
  } catch {
    return [];
  }
}

function saveFeedback(data) {
  fs.writeFileSync(feedbackPath, JSON.stringify(data, null, 2));
}

function submitFeedback(req, res) {
  const { packageName, userRating, userComment, wasPredictionAccurate } = req.body;

  if (!packageName || typeof wasPredictionAccurate !== 'boolean') {
    return res.status(400).json({ error: 'Missing required feedback fields.' });
  }

  const feedbackData = loadFeedback();

  feedbackData.push({
    timestamp: new Date().toISOString(),
    packageName,
    wasPredictionAccurate,
    userRating: userRating || null,
    userComment: userComment || null
  });

  saveFeedback(feedbackData);

  res.json({ message: '✅ Feedback submitted successfully.' });
}

module.exports = { submitFeedback };