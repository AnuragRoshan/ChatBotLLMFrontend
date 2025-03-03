import React from "react";
import { BotMessageSquare, User, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ isDarkMode, toggleDarkMode, userData }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/api/auth/logout", {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <BotMessageSquare size={24} />
        </div>
        <h1>KeepSeeD</h1>
      </div>
      <div className="nav-links">
        <button className="nav-item active">
          <BotMessageSquare size={18} />
          <span>Chat</span>
        </button>
      </div>
      <div className="sidebar-footer">
        {userData && (
          <div
            className="user-profile"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <>
              <div className="avatar">
                {userData.profilePic ? (
                  <img
                    src={userData && userData.profilePic}
                    alt="Profile"
                    className="profile-pic"
                  />
                ) : (
                  <User size={18} />
                )}
              </div>
              <div>{userData.username}</div>
            </>
          </div>
        )}
        <div className="user-profile">
          <div className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </div>
          {userData && (
            <div onClick={handleLogout} className="logout-button">
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
