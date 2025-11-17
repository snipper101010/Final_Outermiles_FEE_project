import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import './styles/dashboard.css';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/budget" element={<Budget />} />
    </Routes>
  );
}

export default App;