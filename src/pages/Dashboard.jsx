import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const [loggedInUser, setLoggedInUser] = useLocalStorage("loggedInUser", null);
  const [trips, setTrips] = useLocalStorage("trips", []);
  const [showForm, setShowForm] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const addTrip = (trip) => {
    const next = [...trips, trip];
    setTrips(next);
    // add trip id to owner in users + update loggedInUser
    const usersCopy = users.map((u) =>
      u.id === trip.ownerId ? { ...u, trips: [...(u.trips || []), trip.id] } : u
    );
    setUsers(usersCopy);
    const updatedUser = usersCopy.find((u) => u.id === trip.ownerId);
    if (updatedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setLoggedInUser(updatedUser);
    }
    setShowForm(false);
  };

  const deleteTrip = (id) => {
    const next = trips.filter((t) => t.id !== id);
    setTrips(next);
    // remove from users
    const usersCopy = users.map((u) => ({
      ...u,
      trips: (u.trips || []).filter((tid) => tid !== id),
    }));
    setUsers(usersCopy);
    const updatedUser = usersCopy.find((u) => u.id === (loggedInUser && loggedInUser.id));
    if (updatedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setLoggedInUser(updatedUser);
    }
  };

  const handleJoinTrip = (code) => {
    const trip = trips.find(t => t.inviteCode === code);
    if (!trip) {
      throw new Error('Invalid invite code');
    }

    const usersCopy = users.map(u => {
      if (u.id === loggedInUser.id) {
        return { ...u, trips: [...(u.trips || []), trip.id] };
      }
      return u;
    });
    
    setUsers(usersCopy);
    const updatedUser = usersCopy.find(u => u.id === loggedInUser.id);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    setLoggedInUser(updatedUser);
  };

  return (
    <div className="om-container">
      <Sidebar 
        user={loggedInUser} 
        onCreateClick={() => setShowForm(true)} 
      />

      <main className="om-content">
        <TripsList
          trips={trips}
          userTrips={loggedInUser?.trips || []}
          onDelete={deleteTrip}
        />
      </main>

      {showForm && (
        <TripForm
          ownerId={loggedInUser?.id}
          onCreate={handleCreateTrip}
          onClose={() => setShowForm(false)}
        />
      )}

      <FriendsList 
        isOpen={showFriends}
        onClose={() => setShowFriends(false)}
        friends={users.filter(u => u.id !== loggedInUser?.id)}
      />

      <JoinTripModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onJoin={handleJoinTrip}
      />

      <TripDetailsModal
        trip={selectedTrip}
        isOpen={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        onDelete={deleteTrip}
      />
    </div>
  );
}
