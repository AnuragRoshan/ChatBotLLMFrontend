import React, { useState, useRef } from "react";
import DOMPurify from "dompurify";
import { useSendMessageMutation } from "../redux/api/chatApiSlice"; // Import RTK Query hook

import ChatScreen from "../component/chat/ChatScreen";
import ChatInput from "../component/chat/ChatInput";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const chatHistoryRef = useRef(null);

  const [sendMessage, { isLoading }] = useSendMessageMutation(); // Use mutation hook

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setChatHistory((prev) => [...prev, { type: "user", content: question }]);

    const textarea = document.querySelector(".input-box");
    setQuestion(""); // Clear input immediately after submitting
    if (textarea) {
      textarea.style.height = "42px"; // Reset textarea height to default
    }

    scrollToBottom();

    try {
      const res = await sendMessage({
        message: question,
        history: chatHistory, // Pass conversation history
      }).unwrap();

      const sanitizedResponse = DOMPurify.sanitize(res.reply);
      setChatHistory((prev) => [
        ...prev,
        { type: "ai", content: sanitizedResponse },
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setChatHistory((prev) => [
        ...prev,
        { type: "ai", content: "❌ Error: Unable to get response from AI" },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <ChatScreen
        chatHistory={chatHistory}
        chatHistoryRef={chatHistoryRef}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        loading={isLoading} // Use isLoading from RTK Query
      />

      <ChatInput
        question={question}
        setQuestion={setQuestion}
        handleSubmit={handleSubmit}
        loading={isLoading} // Use isLoading from RTK Query
      />
    </div>
  );
}
