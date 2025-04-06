const { getMistralResponse } = require('../llm');

async function revokeCookies(req, res) {
  const { appName } = req.body;

  if (!appName) {
    return res.status(400).json({ error: 'appName is required' });
  }

  try {
    const prompt = `
    The user closed the app "${appName}". 
    Respond ONLY with a JSON object containing "strategy" and "actionType".
    
    Strict format:
    {
      "strategy": "Manual or automated steps to revoke or clear cookies.",
      "actionType": "browser-level | server-level | system-cleanup | app-settings"
    }
    No text outside the JSON.
    `;

    const reply = await getMistralResponse(prompt);
    console.log("🔍 Mistral Raw Response:", reply);

    const jsonStart = reply.indexOf('{');
    const jsonEnd = reply.lastIndexOf('}');
    const jsonString = reply.substring(jsonStart, jsonEnd + 1);

    const result = JSON.parse(jsonString);

    res.json({
      message: `🧹 Post-close privacy cleanup for ${appName}`,
      strategy: result.strategy,
      actionType: result.actionType,
    });

  } catch (err) {
    console.error("❌ LLM cookie revoke error:", err.message);
    res.status(500).json({ error: 'Failed to generate cookie rejection plan' });
  }
}

module.exports = { revokeCookies };