// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Layout Components (All flat inside the src directory)
import MainLayout from "./MainLayout";

// Import Page Views
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";

/**
 * Client-Side Session Guard Component
 * Intercepts routing access requests based on the AuthSlice slice state.
 * If verified, drops the child viewport directly into the global MainLayout core frame.
 */
const ProtectedRoute = ({ children }) => {
  // Pull fake client authentication status directly from your local slice file
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Authentication Screens (Standalone Layout Frames) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard Navigation Grid Matrix */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dynamic Fallback Redirection Logic */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
