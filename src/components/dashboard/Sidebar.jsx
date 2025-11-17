// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import profilePic from 'src/assets/images/profile.png';

// export default function Sidebar({ user, onCreateClick }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('loggedInUser');
//     navigate('/');
//   };

//   return (
//     <aside className="om-aside-profile">
//       <div className="om-profile-pic">
//         <img 
//           src={profilePic}
//           alt="Profile" 
//           className="om-profile"
//           style={{
//             width: '100px',
//             height: '100px',
//             borderRadius: '50%',
//             objectFit: 'cover'
//           }}
//         />
//       </div>
//       <h1 className="om-name">{user?.name || 'Guest User'}</h1>
//       <h3 className="om-username">@{user?.username || 'guest_usr'}</h3>
      
//       <nav className="om-sidebar-nav">
//         <div className="om-nav-item om-nav-item-active">Dashboard</div>
//         <div className="om-nav-item">Friends</div>
//         <div className="om-nav-item">Budget</div>
//       </nav>

//       <button 
//         className="om-add" 
//         onClick={onCreateClick}
//       >
//         Create Trip
//       </button>
//       <button 
//         id="logout-btn" 
//         className="btn btn-outline-danger ms-3" 
//         onClick={handleLogout}
//       >
//         Logout
//       </button>
//     </aside>
//   );
// }
// src/components/Sidebar.jsx
// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import profilePic from '../assets/images/profile.png'; // correct path

export default function Sidebar({ user, onCreateClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Budget',     path: '/budget' },
    { label: 'Badges',     path: '/badges' },   // ← This will now appear!
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="om-aside-profile">
      <div className="om-profile-pic">
        <img
          src={profilePic}
          alt="Profile"
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>

      <h1 className="om-name">{user?.name || 'Guest'}</h1>
      <h3 className="om-username">@{user?.username || 'traveler'}</h3>

      <nav className="om-sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`om-nav-item ${isActive(item.path) ? 'om-nav-item-active' : ''}`}
            onClick={() => navigate(item.path)}
            style={{ cursor: 'pointer' }}
          >
            {item.label}
            {item.label === 'Badges' && <span style={{ marginLeft: '8px' }}> Trophy</span>}
          </div>
        ))}
      </nav>

      <button className="om-add w-100" onClick={onCreateClick} style={{ margin: '20px 0' }}>
        + Create Trip
      </button>

      <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}