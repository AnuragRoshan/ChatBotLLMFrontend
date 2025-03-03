import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AuthPage.css";

const AuthPage = ({ isDarkMode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token); // Save token to localStorage
      document.cookie = `token=${token}; path=/`; // Save token to cookies
      navigate("/chat");
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  return (
    <div className={`auth-container ${isDarkMode ? "dark-mode" : ""}`}>
      <h2>Login to DeepSeek AI</h2>
      <button onClick={handleGoogleLogin} className="google-login-btn">
        Login with Google
      </button>
    </div>
  );
};

export default AuthPage;
