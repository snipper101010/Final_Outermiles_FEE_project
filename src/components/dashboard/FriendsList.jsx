import React from 'react';

export default function FriendsList({ isOpen, onClose, friends = [] }) {
  if (!isOpen) return null;

  return (
    <div id="friend-list" className="om-create-trip-popup-new" style={{ display: 'block' }}>
      <div className="form-container-join">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Friends</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        
        <div className="friends-grid">
          {friends.map(friend => (
            <div key={friend.id} className="friend-card">
              <img src={friend.photo || 'https://via.placeholder.com/50'} alt={friend.name} />
              <div className="friend-info">
                <h6>{friend.name}</h6>
                <p>@{friend.username}</p>
              </div>
            </div>
          ))}
          {friends.length === 0 && (
            <p className="text-center text-muted">No friends yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}