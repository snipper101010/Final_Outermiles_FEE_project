import React from "react";

export default function Sidebar({ user, onCreate }) {
  const name = user?.name || "Guest User";
  const username = user?.username || "guest_usr";
  const photo = user?.photo || "https://via.placeholder.com/100";

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    // window.location.href = "/"; // adjust if you have a login route
  };

  return (
    <aside className="om-aside-profile">
      <div className="om-profile-pic">
        <img id="profile-photo" className="om-profile" src={photo} alt="Profile" />
      </div>
      <h1 className="om-name">{name}</h1>
      <h3 className="om-username">@{username}</h3>

      <nav className="om-sidebar-nav">
        <div className="om-nav-item om-nav-item-active">Dashboard</div>
        <div className="om-nav-item">Friends</div>
        <div className="om-nav-item">Budget</div>
      </nav>

      <button className="om-add" onClick={onCreate}>Create trip</button>
      <button className="btn btn-outline-danger ms-3" id="logout-btn" onClick={logout}>Logout</button>
    </aside>
  );
}