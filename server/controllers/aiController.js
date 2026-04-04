
//not working now not evaluating properly, giving 0 score to all answers, need to fix prompt and parsing logic
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Use Gemini Pro model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro"
});

const evaluateAnswer = async (question, answer) => {
  try {
    if (!question || !answer) {
      return { score: 0, feedback: "Invalid input" };
    }

    const prompt = `
You are a strict university examiner.

Question: ${question}
Student Answer: ${answer}

Instructions:
- Give score out of 10
- Be strict but fair
- Feedback should be 2-3 lines

Return ONLY valid JSON:

{
  "score": number,
  "feedback": "text"
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    console.log("Raw AI Response:", text);

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      // fallback if AI returns extra text
      parsed = {
        score: 5,
        feedback: text
      };
    }

    return {
      score: typeof parsed.score === "number" ? parsed.score : 5,
      feedback: parsed.feedback || "No feedback generated"
    };

  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      score: 0,
      feedback: "Evaluation failed"
    };
  }
};

module.exports = { evaluateAnswer };