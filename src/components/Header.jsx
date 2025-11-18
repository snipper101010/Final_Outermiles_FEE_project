// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100">
      <nav className="nav max-w-7xl mx-auto px-6 py-5">
        <div className="nav-container flex items-center justify-between">

          {/* Logo */}
          <div className="logo cursor-pointer" onClick={() => navigate("/")}>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              OuterMiles
            </h2>
          </div>

          {/* Navigation Menu */}
          <ul className="nav-menu hidden md:flex items-center gap-10">
            <li>
              <a href="#features" className="nav-link text-gray-700 font-medium hover:text-teal-600 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="nav-link text-gray-700 font-medium hover:text-teal-600 transition">
                How it Works
              </a>
            </li>
            <li>
              <a href="#featured-trips" className="nav-link text-gray-700 font-medium hover:text-teal-600 transition">
                Featured Trips
              </a>
            </li>

            {/* View Weather – Now a REAL link! */}
            <li>
              <Link
                to="/weather"
                className="nav-link text-gray-700 font-medium hover:text-teal-600 transition flex items-center gap-2"
              >
                View Weather
              </Link>
            </li>
          </ul>

          {/* Right Side Buttons */}
          <div className="nav-actions flex items-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="btn btn-primary px-6 py-3 text-teal-600 font-bold border-2 border-teal-600 rounded-full hover:bg-teal-50 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="btn-secondary px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="hamburger md:hidden cursor-pointer">
            <span className="bar block w-7 h-0.5 bg-gray-700 mb-1.5"></span>
            <span className="bar block w-7 h-0.5 bg-gray-700 mb-1.5"></span>
            <span className="bar block w-7 h-0.5 bg-gray-700"></span>
          </div>
        </div>
      </nav>
    </header>
  );
} 
