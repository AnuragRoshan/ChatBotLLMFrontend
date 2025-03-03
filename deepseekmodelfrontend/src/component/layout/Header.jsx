import React from "react";

const Header = ({ clearChat }) => {
  return (
    <header className="chat-header">
      <h2>AI Assistant</h2>
      <div className="header-actions">
        <button className="clear-btn" onClick={clearChat}>
          Clear Chat
        </button>
      </div>
    </header>
  );
};

export default Header;
