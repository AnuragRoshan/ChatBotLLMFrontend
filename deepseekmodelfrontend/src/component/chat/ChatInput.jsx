import React from "react";
import { Send } from "lucide-react";

const ChatInput = ({ question, setQuestion, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        className="input-box"
        // disabled={loading}
        rows="1"
        style={{
          height: "auto", // Reset height to auto to recalculate
        }}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
      />
      <button
        type="submit"
        disabled={loading || !question.trim()}
        className={`ask-button ${!question.trim() ? "disabled" : ""}`}
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default ChatInput;
