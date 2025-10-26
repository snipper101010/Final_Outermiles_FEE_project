import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

// Protected Route component to check authentication
const ProtectedRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
  if (!loggedInUser) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}