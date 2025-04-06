const axios = require('axios');

async function getMistralResponse(prompt) {
  try {
    const response = await axios.post('http://127.0.0.1:11434/api/generate', {
      model: 'mistral', // or your model name
      prompt,
      stream: false
    });

    return response.data.response || 'No response from LLM';
  } catch (err) {
    console.error("❌ LLM Error:", err.message);
    return "Error generating response from LLM.";
  }
}

module.exports = { getMistralResponse };