const fs = require('fs');
const path = require('path');
const { getMistralResponse } = require('../llm');

const dbPath = path.join(__dirname, '..', 'malwareDB.json');

// Load existing DB
function loadDB() {
  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { malicious: [] };
  }
}

// Save DB
function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

async function updateMalwareDB(req, res) {
  const { apps } = req.body; // array of app names/packageNames

  if (!Array.isArray(apps) || apps.length === 0) {
    return res.status(400).json({ error: 'apps array is required' });
  }

  const db = loadDB();
  const added = [];

  for (const app of apps) {
    const prompt = `Evaluate the risk level of the app "${app}". Respond with JSON { score, level }.`;

    try {
      const response = await getMistralResponse(prompt);
      const parsed = JSON.parse(response);

      if ((parsed.level === 'High' || parsed.score >= 80) && !db.malicious.includes(app.toLowerCase())) {
        db.malicious.push(app.toLowerCase());
        added.push(app);
      }
    } catch (err) {
      console.error(`⚠️ Failed to process ${app}:`, err.message);
    }
  }

  saveDB(db);

  res.json({
    message: '✅ Malware DB updated',
    newlyAdded: added,
    totalMaliciousCount: db.malicious.length
  });
}

module.exports = { updateMalwareDB };