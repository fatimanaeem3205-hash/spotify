import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  // Beginner-friendly user authentication state handled directly at the core layout tier.
  // This layout makes it easy to explain session persistence without complex code.
  const [user, setUser] = useState(() => {
    const cachedUser = localStorage.getItem("fakeUser");
    return cachedUser ? JSON.parse(cachedUser) : null;
  });

  const handleLoginSuccess = (userPayload) => {
    setUser(userPayload);
    localStorage.setItem("fakeToken", "mock-jwt-token-string");
    localStorage.setItem("fakeUser", JSON.stringify(userPayload));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("fakeToken");
    localStorage.removeItem("fakeUser");
  };

  // Protected Route component checks local state for authentication
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    // Explicitly pass down user and logout handlers to the layout structural frame via standard props
    return <MainLayout user={user} onLogout={handleLogout}>{children}</MainLayout>;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Views */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<Signup onSignupSuccess={handleLoginSuccess} />} />

        {/* Guarded Application Views */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile user={user} /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;