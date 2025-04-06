// routes/risk.js

const express = require('express');
const router = express.Router();
const { getMistralResponse } = require('../llm');  
const { getRiskScore } = require('../controllers/riskController');

router.post('/', getRiskScore);

router.post('/calculate-risk', async (req, res) => {
  const appData = req.body;

  if (!appData || !appData.name) {
    return res.status(400).json({ error: 'Invalid app data' });
  }

  const prompt = `
You are a cybersecurity LLM evaluating mobile applications for potential risks. Analyze the app below and return a JSON with the following structure:

{
  "score": number (0 to 100),
  "level": "Low" | "Medium" | "High",
  "reasons": [array of strings explaining risk factors]
}
  Use these strict rules:
- Apps with vague names or suspicious branding (e.g., "TeraBox") should be flagged.
- Absence of privacy policy or developer verification increases risk.
- Reviews mentioning scams, data loss, or intrusive ads are critical.
- Known unsafe apps must be scored below 50.


App Data:
${JSON.stringify(appData, null, 2)}

Only respond with a valid JSON object.
`;

  try {
    const llmResponse = await getMistralResponse(prompt);

    let result;
    try {
      result = JSON.parse(llmResponse); // Ensure it's valid JSON
    } catch (e) {
      return res.status(500).json({ error: 'Invalid JSON returned by LLM', raw: llmResponse });
    }

    res.json(result);
  } catch (err) {
    console.error('LLM risk scoring error:', err);
    res.status(500).json({ error: 'Failed to calculate risk score' });
  }
});

module.exports = router;