const express = require('express');
const axios = require('axios');
const AppLog = require('../models/AppLog');
const router = express.Router();

// Mistral endpoint (change this to your Mistral machine IP if remote)
const MISTRAL_API = 'http://127.0.0.1:11434/api/generate'; // or http://<IP>:11434

async function getMistralVerdict({ packageName, permissions, cookies, trackers }) {
  const prompt = `
You are a privacy risk analyst AI. Analyze the following app and give a JSON response.

App:
- Package Name: ${packageName}
- Permissions: ${permissions.join(', ')}
- Uses Cookies: ${cookies}
- Trackers Count: ${trackers}

Reply only in this JSON format:
{
  "verdict": "safe" | "warning" | "dangerous",
  "reason": "short explanation"
}
  `;

  try {
    const response = await axios.post(MISTRAL_API, {
      model: 'mistral',
      prompt,
      stream: false
    });

    const data = JSON.parse(response.data.response.trim());
    return data;
  } catch (err) {
    console.error('🔴 Mistral error:', err);
    return { verdict: 'unknown', reason: 'Model error' };
  }
}

router.post('/', async (req, res) => {
  const { packageName, permissions, cookies, trackers, userId } = req.body;

  if (!packageName || !permissions || typeof cookies === 'undefined' || typeof trackers === 'undefined') {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const aiResult = await getMistralVerdict({ packageName, permissions, cookies, trackers });
  const verdict = aiResult.verdict;
  const reason = aiResult.reason;

  // Assign dummy score for compatibility
  let score = verdict === 'dangerous' ? 1 : verdict === 'warning' ? 0.75 : 0.5;

  const log = new AppLog({
    userId,
    packageName,
    permissions,
    cookies,
    trackers,
    score,
    verdict
  });

  await log.save();

  res.json({
    success: true,
    verdict,
    reason,
    message: `📦 ${packageName} is marked as "${verdict}".`,
  });
});

module.exports = router;