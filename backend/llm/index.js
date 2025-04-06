const axios = require('axios');

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

async function getMistralResponse(prompt) {
    try {
      const response = await axios.post(
        'https://api.mistral.ai/v1/chat/completions',
        {
          model: 'mistral-medium',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${MISTRAL_API_KEY}`,
            'Content-Type': 'application/json',
          }
        }
      );
  
      return response.data.choices[0].message.content.trim();
  
    } catch (err) {
      console.error("❌ Mistral API Error:", err.response?.data || err.message);
      throw err;
    }
  }

module.exports = { getMistralResponse };