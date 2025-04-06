// test.js
const { getMistralResponse } = require('./llm');

getMistralResponse("Is the app com.vpn.freeultrasafe risky?")
  .then(res => console.log("LLM says:", res));