const express = require('express');
const router = express.Router();
const { getMistralResponse } = require('../llm');
const sendFCMAlert = require('../fcm'); // exporting a default function, not destructuring

// POST /api/score
router.post('/', async (req, res) => {
  try {
    const { packageName, fcmToken } = req.body;

    if (!packageName || !fcmToken) {
      return res.status(400).json({ error: "❌ Missing required fields: 'packageName' or 'fcmToken'" });
    }

    // Prepare the prompt
    const mistralPrompt = `Analyze the risk of the following Android app based on its name and suggest if it poses a threat to privacy: ${packageName}`;

    // Call LLM (Mistral) and wait for result
    const llmOutput = await getMistralResponse(mistralPrompt);

    const lowerOutput = llmOutput.toLowerCase();
    const isMalicious = lowerOutput.includes("risk") || lowerOutput.includes("danger") || lowerOutput.includes("suspicious");

    // If LLM thinks it's malicious, send an FCM alert
    if (isMalicious) {
      await sendFCMAlert(
        fcmToken,
        `🚨 Privacy Alert`,
        `The app "${packageName}" may pose a privacy risk.\n\n🧠 AI says: ${llmOutput}`
      );
    }

    res.status(200).json({
      message: "✅ Risk analysis completed",
      isMalicious,
      explanation: llmOutput
    });

  } catch (err) {
    console.error('❌ Error in /api/score:', err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;