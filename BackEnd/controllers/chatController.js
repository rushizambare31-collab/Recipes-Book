const ChatSession = require("../models/ChatSession");
const { getAIResponse } = require("../utils/gemini");

// POST /api/chat/send
const sendMessage = async (req, res) => {
  try {
    const { deviceId, message } = req.body;

    if (!deviceId || !message) {
      return res.status(400).json({ success: false, error: "deviceId aur message dono chahiye" });
    }

    // Step 1: Existing session dhoondo, nahi mile to naya bana do
    let session = await ChatSession.findOne({ deviceId });

    if (!session) {
      session = new ChatSession({ deviceId, messages: [] });
    }

    // Step 2: User ka naya message history mein daalo
    session.messages.push({ role: "user", content: message });

    // Step 3: Gemini ko poori history bhejo (context ke saath)
    const aiReply = await getAIResponse(session.messages);

    // Step 4: AI ka reply bhi history mein daalo
    session.messages.push({ role: "assistant", content: aiReply });

    // Step 5: Save karo MongoDB mein
    await session.save();

    res.status(200).json({ success: true, reply: aiReply });
  } catch (error) {
    console.error("sendMessage error:", error.message);
    res.status(500).json({ success: false, error: "Kuch galat ho gaya, dobara try karo" });
  }
};

// GET /api/chat/history/:deviceId
const getHistory = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const session = await ChatSession.findOne({ deviceId });

    if (!session) {
      return res.status(200).json({ success: true, messages: [] });
    }

    res.status(200).json({ success: true, messages: session.messages });
  } catch (error) {
    console.error("getHistory error:", error.message);
    res.status(500).json({ success: false, error: "History fetch nahi ho paayi" });
  }
};

module.exports = { sendMessage, getHistory };