// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import Weather from './pages/Weather';   // ← Keep this exact name

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/weather" element={<Weather />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
