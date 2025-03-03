import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import Sidebar from "./component/layout/SideBar";
import Header from "./component/layout/Header";
import ChatPage from "./page/ChatPage";
import AuthPage from "./page/AuthPage";
import "./App.css";

// ProtectedRoute Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track authentication status

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auth/status", {
          withCredentials: true,
        });

        console.log("Auth Status Response:", res.data);

        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUserData(res.data.user);
          console.log("User Data:", res.data.user);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode");
  };

  const clearChat = () => {
    console.log("Clear chat called");
  };

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? "dark" : "light"}`}>
        <Sidebar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          userData={userData}
        />

        <div className="main-content">
          <Header clearChat={clearChat} />

          <Routes>
            {/* Redirect to /chat if already authenticated and trying to access /auth */}
            <Route
              path="/auth"
              element={
                isAuthenticated === false ? (
                  <AuthPage isDarkMode={isDarkMode} />
                ) : (
                  <Navigate to="/chat" />
                )
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/chat" />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
