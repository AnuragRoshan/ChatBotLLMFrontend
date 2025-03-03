import React from "react";
import { User, BotMessageSquare, Clipboard } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, vs } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatScreen = ({
  chatHistory,
  isDarkMode,
  copyToClipboard,
  copiedIndex,
  chatHistoryRef,
  isExpanded,
  setIsExpanded,
  loading,
}) => {
  return (
    <div className="chat-history" ref={chatHistoryRef}>
      {chatHistory.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <BotMessageSquare size={32} />
          </div>
          <h3>Start a conversation</h3>
          <p>Ask a question to begin chatting with the AI assistant.</p>
        </div>
      ) : (
        chatHistory.map((msg, index) => {
          const toggleReadMore = () => {
            setIsExpanded(!isExpanded);
          };

          const isLongMessage =
            msg.type === "user" && msg.content.length > 3000;
          const displayedContent =
            isLongMessage && !isExpanded
              ? msg.content.slice(0, 3000) + "..."
              : msg.content;

          return (
            <div
              key={index}
              className={`chat-message ${msg.type}`}
              style={{
                display: "flex",
                flexDirection: msg.type === "user" ? "row-reverse" : "row",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              {/* Avatar Section */}
              <div className="message-avatar">
                {msg.type === "user" ? (
                  <div className="user-avatar">
                    <User size={16} />
                  </div>
                ) : (
                  <div className="ai-avatar">
                    <BotMessageSquare size={16} />
                  </div>
                )}
              </div>

              {/* Message Content Section */}
              <div
                className="message-content"
                style={{
                  backgroundColor:
                    msg.type === "user" ? "#787878" : "var(--card-bg)",
                  color: msg.type === "user" ? "white" : "var(--text-primary)",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  maxWidth: "75%",
                  boxShadow: "var(--shadow-sm)",
                  marginLeft: msg.type === "user" ? "0" : "10px",
                  marginRight: msg.type === "user" ? "10px" : "0",
                }}
              >
                <ReactMarkdown
                  components={{
                    ol: ({ children, ...props }) => (
                      <ol
                        style={{
                          paddingLeft: "20px",
                          margin: 0,
                          listStyleType: "decimal",
                          listStylePosition: "inside",
                        }}
                        {...props}
                      >
                        {children}
                      </ol>
                    ),
                    ul: ({ children, ...props }) => (
                      <ul
                        style={{
                          paddingLeft: "20px",
                          margin: 0,
                          listStyleType: "disc",
                          listStylePosition: "inside",
                        }}
                        {...props}
                      >
                        {children}
                      </ul>
                    ),
                    li: ({ children, ...props }) => (
                      <li
                        style={{
                          wordBreak: "break-word",
                          lineHeight: "1.5",
                        }}
                        {...props}
                      >
                        {children}
                      </li>
                    ),
                    code({ node, inline, className, children, ...props }) {
                      const codeText = String(children).replace(/\n$/, "");
                      const match = /language-(\w+)/.exec(className || "");
                      const language = match ? match[1] : "javascript";

                      return !inline ? (
                        <div className="code-block">
                          <div className="code-header">
                            <span className="code-language">{language}</span>
                            <button
                              className="copy-button"
                              onClick={() => copyToClipboard(codeText, index)}
                            >
                              <Clipboard size={14} />
                              {copiedIndex === index ? (
                                <span className="copied-text">Copied!</span>
                              ) : (
                                <span>Copy</span>
                              )}
                            </button>
                          </div>
                          <SyntaxHighlighter
                            language={language}
                            style={isDarkMode ? atomDark : vs}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0 0 6px 6px",
                              maxWidth: "100%",
                              overflowX: "auto",
                            }}
                            {...props}
                          >
                            {codeText}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code className={className} {...props}>
                          {codeText}
                        </code>
                      );
                    },
                  }}
                >
                  {displayedContent}
                </ReactMarkdown>

                {/* Read More / Read Less Button */}
                {isLongMessage && (
                  <button
                    onClick={toggleReadMore}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "1rem",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                      padding: 0,
                      marginTop: "10px",
                      textDecoration: "none",
                    }}
                  >
                    {isExpanded ? "" : "Read More"}
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
      {loading && (
        <div className="chat-message ai">
          <div className="message-avatar">
            <div className="ai-avatar">
              <BotMessageSquare size={16} />
            </div>
          </div>
          <div className="message-content loading-message">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;
