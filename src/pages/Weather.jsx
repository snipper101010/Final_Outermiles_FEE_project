import React, { useState } from 'react';

import { Cloud, Droplets, Wind, Plane, Gauge } from "lucide-react";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './weather-styles.css';



const WeatherDashboard = () => {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  // Realistic 24-hour humidity trend
  const generateHumidityData = () => {
    const data = [];
    const now = new Date();
    now.setMinutes(0, 0, 0);
    for (let i = 0; i < 24; i++) {
      const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      const hour = time.getHours();
      const displayHour = hour % 12 || 12;
      const period = hour >= 12 ? 'PM' : 'AM';

      const base = hour >= 4 && hour <= 7 ? 82 : hour >= 20 || hour <= 3 ? 78 : 58;
      const variation = Math.sin((i / 23) * Math.PI) * 18;
      const humidity = Math.round(base + variation + (Math.random() * 12 - 6));
      data.push({
        time: `${displayHour}${period}`,
        humidity: Math.max(35, Math.min(95, humidity)),
      });
    }
    return data;
  };

  const handleSearch = () => {
    if (!searchInput.trim()) return;

    const conditions = ['Sunny', 'Clear Sky', 'Partly Cloudy', 'Light Clouds', 'Perfect Weather'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];

    const temp = Math.round(14 + Math.random() * 18);
    const feelsLike = temp - Math.round(Math.random() * 4);
    const humidity = Math.round(45 + Math.random() * 35);
    const windSpeed = Math.round(5 + Math.random() * 25);
    const pressure = 1005 + Math.round(Math.random() * 20);

    let score = 100;
    if (temp < 18 || temp > 28) score -= Math.abs(temp - 23) * 3;
    if (humidity > 70) score -= (humidity - 70) * 1.2;
    if (windSpeed > 25) score -= (windSpeed - 25) * 2;
    if (!condition.includes('Sunny') && !condition.includes('Clear')) score -= 15;
    score = Math.max(30, Math.min(100, Math.round(score)));

    const newData = {
      location: searchInput.charAt(0).toUpperCase() + searchInput.slice(1).toLowerCase(),
      temperature: temp,
      feelsLike,
      condition,
      humidity,
      windSpeed,
      pressure,
      humidityData: generateHumidityData(),
      travelScore: score,
      travelRating:
        score >= 85 ? 'Excellent for Travel' :
        score >= 70 ? 'Great Conditions' :
        score >= 55 ? 'Good to Travel' : 'Use Caution',
    };

    setWeatherData(newData);
    setSearchInput('');
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{payload[0].payload.time}</p>
          <p className="tooltip-humidity">Humidity: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const humidityStats = weatherData ? {
    current: weatherData.humidity,
    average: Math.round(weatherData.humidityData.reduce((a, d) => a + d.humidity, 0) / 24),
    peak: Math.max(...weatherData.humidityData.map(d => d.humidity)),
  } : null;

  // Dynamic contributing factors
  const getTravelFactors = () => {
    if (!weatherData) return [];
    const tempGood = weatherData.temperature >= 18 && weatherData.temperature <= 28;
    const humidityGood = weatherData.humidity <= 70;
    const windGood = weatherData.windSpeed <= 25;
    const skyGood = weatherData.condition.includes('Sunny') || weatherData.condition.includes('Clear');

    return [
      { label: "Comfortable temperature", good: tempGood },
      { label: "Low to moderate humidity", good: humidityGood },
      { label: "Calm winds", good: windGood },
      { label: "Clear or mostly clear skies", good: skyGood },
    ];
  };

  return (
    <div className="dashboard">
      {/* Header */}
     {/* <div className="header">
       <h1 className="title">
         <span className="title-weather"></span>{' '}
         <span className="title-dashboard"></span>
       </h1>
         <p className="subtitle"></p>
       </div> */}

      {/* Search */}
      <div className="search-container">
        <div className="search-box">
          <div className="search-input-wrapper">
            <svg className="location-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Enter city name (e.g., Paris, Tokyo, Dubai)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button className="search-button" onClick={handleSearch}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            Search
          </button>
        </div>
      </div>

      {/* Empty State */}
      {!weatherData ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h2 className="empty-title">No location selected</h2>
          <p className="empty-description">Search for a city to see current weather and travel advice</p>
        </div>
      ) : (
        <>
          {/* Current Weather */}
          <div className="weather-section">
            <div className="section-header">
              <Cloud size={22} />
              <h2>Current Weather</h2>
            </div>

            <div className="current-weather">
              <div className="weather-main">
                <h3 className="location-name">{weatherData.location}</h3>
                <p className="current-conditions">Current conditions</p>

                <div className="temp-display">
                  <div className="sun-icon">
                    <div className="sun-core"></div>
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <div key={deg} className="sun-ray" style={{ transform: `rotate(${deg}deg)` }}></div>
                    ))}
                  </div>
                  <div className="temp-info">
                    <div className="temperature">{weatherData.temperature}°</div>
                    <div className="condition">{weatherData.condition}</div>
                  </div>
                </div>
              </div>

              <div className="weather-stats">
                <div className="stat-card">
                  <div className="stat-header">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
                    </svg>
                    <span>Feels Like</span>
                  </div>
                  <div className="stat-value">{weatherData.feelsLike}°</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <Droplets size={18} />
                    <span>Humidity</span>
                  </div>
                  <div className="stat-value">{weatherData.humidity}%</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <Wind size={18} />
                    <span>Wind Speed</span>
                  </div>
                  <div className="stat-value">{weatherData.windSpeed} km/h</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <Gauge size={18} />
                    <span>Pressure</span>
                  </div>
                  <div className="stat-value">{weatherData.pressure} hPa</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bottom-section">
            {/* Humidity Trends */}
            <div className="humidity-section">
              <div className="section-header">
                <Droplets size={22} />
                <h2>Humidity Trends (24h)</h2>
              </div>

              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={weatherData.humidityData}>
                    <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#0ea5e9"
                      strokeWidth={3}
                      dot={{ fill: '#0ea5e9', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="humidity-stats">
                <div className="humidity-stat">
                  <div className="stat-label">Current</div>
                  <div className="stat-number">{humidityStats.current}%</div>
                </div>
                <div className="humidity-stat">
                  <div className="stat-label">24h Average</div>
                  <div className="stat-number">{humidityStats.average}%</div>
                </div>
                <div className="humidity-stat">
                  <div className="stat-label">Peak</div>
                  <div className="stat-number">{humidityStats.peak}%</div>
                </div>
              </div>
            </div>

            {/* Travel Recommendation */}
            <div className="travel-section">
              <div className="section-header">
                <Plane size={22} />
                <h2>Travel Recommendation</h2>
              </div>

              <div className="travel-score">
                <div className="score-circle">
                  <div className="score-number">{weatherData.travelScore}</div>
                </div>
                <h3 className="travel-rating">{weatherData.travelRating}</h3>
                <p className="travel-subtitle">Based on current conditions</p>
              </div>

              {/* <div className="contributing-factors">
                <h4>CONTRIBUTING FACTORS</h4>
                {getTravelFactors().map((factor, i) => (
                  <div key={i} className="factor-item">
                    <div className="factor-left">
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none"
                        stroke={factor.good ? "#10b981" : "#ef4444"} strokeWidth="2.5">
                        {factor.good ? (
                          <polyline points="20 6 9 17 4 12" />
                        ) : (
                          <line x1="18" y1="6" x2="6" y2="18" />
                        )}
                      </svg>
                      <span>{factor.label}</span>
                    </div>
                    <span className={`factor-badge ${factor.good ? 'good' : 'bad'}`}>
                      {factor.good ? 'Good' : 'Poor'}
                    </span>
                  </div>
                ))}
              </div> */}

              { <div className="travel-tips">
                <h4>Travel Tips</h4>
                {weatherData.travelScore >= 85 && <p>Perfect weather for flights and outdoor activities</p>}
                {weatherData.travelScore >= 70 && weatherData.travelScore < 85 && <p>Great day to travel — bring a light jacket if needed</p>}
                {weatherData.travelScore >= 55 && weatherData.travelScore < 70 && <p>Acceptable conditions — stay hydrated and check updates</p>}
                {weatherData.travelScore < 55 && (
                  <>
                    <p>Challenging conditions — consider rescheduling if possible</p>
                    <p>High heat/humidity may cause discomfort</p>
                  </>
                )}
              </div> }
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
