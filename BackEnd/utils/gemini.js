const { GoogleGenerativeAI } = require("@google/generative-ai");
const {SYSTEM_INSTRUCTION} = require("../config/aiPrompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getAIResponse(conversationHistory) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION
  });

  // Mongoose ke messages ko Gemini ke format mein convert karna padta hai
  const formattedHistory = conversationHistory.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }]
  }));

  // Last message ko alag nikalo (wo abhi ka naya sawaal hai)
  const lastMessage = formattedHistory.pop();

  const chat = model.startChat({
    history: formattedHistory,
    
  });

  const result = await chat.sendMessage(lastMessage.parts[0].text);
  return result.response.text();
}

module.exports = { getAIResponse };