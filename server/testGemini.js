//not working laang 


const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

console.log("API KEY:", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // ✅ works with new SDK
      contents: "Say hello in one line",
    });

    console.log("✅ Gemini Response:", response.text);

  } catch (error) {
    console.error("❌ ERROR:", error.message);
  }
}

test();