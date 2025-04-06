const { getMistralResponse } = require('../llm');

const getRiskScore = async (req, res) => {
  const app = req.body.packageName || req.body['package-name'];

  if (!app) {
    return res.status(400).json({ error: 'packageName is required' });
  }

  const prompt = `Evaluate the risk of the app "${app}" and respond strictly in this JSON format: { "score": number, "level": "Low" | "Medium" | "High" }`;

  try {
    const rawResponse = await getMistralResponse(prompt);
    const parsed = JSON.parse(rawResponse);

    if (typeof parsed.score !== 'number' || !parsed.level) {
      throw new Error('Malformed response from Mistral');
    }

    return res.json({
      packageName: app,
      riskScore: parsed.score,
      riskLevel: parsed.level
    });
  } catch (err) {
    console.error('Risk score error:', err.message);
    console.log("Incoming body:", req.body);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { getRiskScore };