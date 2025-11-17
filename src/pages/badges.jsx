// src/pages/Badges.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Badges() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Protect route: redirect if not logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      navigate('/');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  if (!user) return null; // or a loading spinner

  const badges = [
    { id: 1, name: "First Trip", icon: "Globe", desc: "Created your first trip", unlocked: true },
    { id: 2, name: "Budget Boss", icon: "Money", desc: "Perfectly split expenses", unlocked: true },
    { id: 3, name: "Globe Trotter", icon: "Plane", desc: "Traveled to 3+ countries", unlocked: true },
    { id: 4, name: "Group Leader", icon: "Crown", desc: "Invited 5+ friends", unlocked: false },
    { id: 5, name: "Early Bird", icon: "Sunrise", desc: "Planned 6 months ahead", unlocked: false },
    { id: 6, name: "Legend", icon: "Star", desc: "Earned all badges", unlocked: false },
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="om-container">
      {/* Sidebar - now shows "Badges" as active */}
      <Sidebar user={user} onCreateClick={() => alert("Create trip from dashboard!")} />

      {/* Main Content */}
      <main className="om-main-content">
        {/* Top Bar */}
        <div className="om-navbar">
          <h1 className="om-heading">Badges Earned</h1>
          <div className="om-right-actions">
            <span style={{ color: '#00d4aa', fontWeight: '700', fontSize: '18px' }}>
              {unlockedCount} / {badges.length} Unlocked
            </span>
          </div>
        </div>

        {/* Badges Grid */}
        <div style={{ padding: '32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
            marginTop: '20px'
          }}>
            {badges.map(badge => (
              <div
                key={badge.id}
                className="om-card"
                style={{
                  padding: '28px',
                  textAlign: 'center',
                  borderRadius: '18px',
                  background: badge.unlocked 
                    ? 'linear-gradient(135deg, #f8fffd 0%, #e6fffa 100%)' 
                    : '#f1f3f5',
                  border: badge.unlocked ? '2px solid #00d4aa' : '2px dashed #ced4da',
                  opacity: badge.unlocked ? 1 : 0.65,
                  transition: 'all 0.3s ease',
                  boxShadow: badge.unlocked ? '0 8px 25px rgba(0, 212, 170, 0.15)' : 'none'
                }}
              >
                <div style={{ fontSize: '70px', marginBottom: '16px' }}>
                  {badge.icon}
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  margin: '12px 0',
                  color: badge.unlocked ? '#2c3e50' : '#868e96'
                }}>
                  {badge.name}
                </h3>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: '14px',
                  margin: '8px 0 16px'
                }}>
                  {badge.desc}
                </p>
                {!badge.unlocked && (
                  <span style={{
                    background: '#e5e7eb',
                    color: '#6b7280',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    Locked
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}