const chatService = require("../services/chatService");
const Chat = require("../models/chatModel");

const handleChatRequest = async (req, res) => {
  const { message, history } = req.body; // Accept history in the request body

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Create a context by combining previous history and current message
    const context = history
      .map(
        (entry) => `${entry.type === "user" ? "User" : "AI"}: ${entry.content}`
      )
      .join("\n");

    const prompt = `${context}\nUser: ${message}`;

    const reply = await chatService.getChatResponse(prompt);

    res.json({ reply });
  } catch (error) {
    console.error("Error in chatController:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleChatRequest,
};

// const chatService = require("../services/chatService");
// const Chat = require("../models/chatModel");
// const User = require("../models/userModel");

// const handleChatRequest = async (req, res) => {
//   const { message, userId } = req.body;

//   if (!message || !userId) {
//     return res.status(400).json({ error: "Message and userId are required" });
//   }

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const reply = await chatService.getChatResponse(message);

//     const chat = new Chat({
//       user: userId,
//       userMessage: message,
//       aiResponse: reply,
//     });

//     await chat.save();

//     res.json({ reply });
//   } catch (error) {
//     console.error("Error in chatController:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   handleChatRequest,
// };
