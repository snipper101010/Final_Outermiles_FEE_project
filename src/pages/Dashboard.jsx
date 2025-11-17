import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from '../assets/images/profile.png';

import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  getDocs 
} from "firebase/firestore";


/**
 * Dashboard.jsx
 * Single-file React port of the original dashboard (uses dashboard.css).
 *
 * Notes:
 * - Place your existing dashboard.css in src/styles/dashboard.css
 * - This component reads/writes localStorage keys: "users", "trips", "loggedInUser"
 * - Replace the Google Maps iframe API key if you want a working map in "Discover".
 */

export default function Dashboard() {

  const usersRef = collection(db, "users");
const tripsRef = collection(db, "trips");

  // UI state
  const [activeTab, setActiveTab] = useState("you"); // "you" | "discover"
  const [showTripForm, setShowTripForm] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(null); // trip object or null
  const [showFriendsPopup, setShowFriendsPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // data state
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  // Add-Trip form state
  const [tripName, setTripName] = useState("");
  const [tripCountry, setTripCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Join trip state
  const [joinCode, setJoinCode] = useState("");

  // Load initial data from localStorage
  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  //   const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
  //   const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  //   if (!storedUser) {
  //     // If there's no loggedInUser available, show an error message (original app redirected)
  //     setErrorMessage("Please log in first (no loggedInUser found in localStorage).");
  //     // Optionally set a default guest user to let the UI function — comment/uncomment as desired:
  //     // const guest = { id: 1, name: "Guest User", username: "guest_usr", photo: "https://via.placeholder.com/100", trips: [], friends: [] };
  //     // localStorage.setItem("loggedInUser", JSON.stringify(guest));
  //     // setUser(guest);
  //     return;
  //   }

  //   setUser(storedUser);
  //   const myTrips = storedTrips.filter((t) => (storedUser.trips || []).includes(t.id));
  //   setTrips(myTrips);

  //   // resolve friend objects
  //   const friends = (storedUser.friends || []).map((fid) => storedUsers.find((u) => u.id === fid)).filter(Boolean);
  //   setFriendsList(friends);
  // }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const authUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!authUser) {
        setErrorMessage("Please log in first.");
        return;
      }

      // 🔥 Fetch latest user data from Firestore
      const snap = await getDoc(doc(db, "users", authUser.id.toString()));

      if (snap.exists()) {
        const freshUser = snap.data();

        // username from email
        freshUser.username = freshUser.email.split("@")[0];

        // Store updated data in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(freshUser));
        setUser(freshUser);

        // Filter trips
        const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
        const myTrips = storedTrips.filter(t => (freshUser.trips || []).includes(t.id));
        setTrips(myTrips);

        // Friends
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const friends = (freshUser.friends || [])
          .map(fid => storedUsers.find(u => u.id === fid))
          .filter(Boolean);
          
        setFriendsList(friends);
      }
    };

    fetchUser();
  }, []);


  // Utility: persist users/trips/loggedInUser
  const persistAll = ({ updatedUser = null, updatedTrips = null, updatedUsers = null } = {}) => {
    if (updatedUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    if (updatedTrips) {
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      // update local trips shown for current user
      if (user) {
        const userTripObjs = updatedTrips.filter((t) => (updatedUser?.trips || user.trips || []).includes(t.id));
        setTrips(userTripObjs);
      }
    }
    if (updatedUsers) {
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      // update friends list displayed
      if (updatedUser) {
        const friends = (updatedUser.friends || []).map((fid) => updatedUsers.find((u) => u.id === fid)).filter(Boolean);
        setFriendsList(friends);
      }
    }
  };

  // Handler: open Add Trip modal
  const handleOpenAddTrip =  () => {
    // reset form values
    setTripName("");
    setTripCountry("");
    setStartDate("");
    setEndDate("");
    setShowTripForm(true);
  };

  // Handler: create trip
  const handleCreateTrip = async () => {
    if (!tripName || !tripCountry || !startDate || !endDate) {
      setErrorMessage("!! Please Fill All Fields !!");
      return;
    }
    if (endDate < startDate) {
      setErrorMessage("!! End Date should not be less than Start Date !!");
      return;
    }

    const countryImages = {
      India: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80",
      Uae: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80",
      France: "https://images.unsplash.com/photo-1418854982207-12f710b74003?auto=format&fit=crop&w=1000&q=80",
      Japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    };

    const newTrip = {
      id: Date.now(),
      name: tripName,
      country: tripCountry,
      startdate: startDate,
      enddate: endDate,
      image: countryImages[tripCountry] || "",
      ownerId: user.id,
      inviteCode: Math.random().toString(36).substring(2, 8),
    };

    const allTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    const updatedTrips = [...allTrips, newTrip];

    // update current user to include new trip id
    const updatedUser = { ...user, trips: [...(user.trips || []), newTrip.id] };

    // update users list: replace user object or push if missing
    let updatedUsers;
    if (allUsers && allUsers.length > 0) {
      updatedUsers = allUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u));
      if (!updatedUsers.some((u) => u.id === updatedUser.id)) updatedUsers.push(updatedUser);
    } else {
      updatedUsers = [updatedUser];
    }

    persistAll({ updatedUser, updatedTrips, updatedUsers });
    // Firestore: add trip to trips collection
    const tripRef = await addDoc(tripsRef, newTrip);

    // Firestore: update user's trip array
    await updateDoc(doc(db, "users", user.id.toString()), {
      trips: [...(user.trips || []), newTrip.id]
    });
    setShowTripForm(false);
    setErrorMessage("");
  };

  // Handler: show trip details
  const handleShowTripDetails = (trip) => {
    setShowTripDetails(trip);
  };

  // Handler: delete trip
  const handleDeleteTrip = async (tripId) => {
    const allTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const updatedTrips = allTrips.filter((t) => t.id !== tripId);

    // remove from all users
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = allUsers.map((u) => ({ ...u, trips: (u.trips || []).filter((id) => id !== tripId) }));

    // update logged in user
    const updatedUser = { ...user, trips: (user.trips || []).filter((id) => id !== tripId) };

    persistAll({ updatedUser, updatedTrips, updatedUsers });
    await updateDoc(doc(db, "users", user.id.toString()), {
      trips: updatedUser.trips
    });

    // delete trip from Firestore
    await deleteDoc(doc(db, "trips", tripId.toString()));

    setShowTripDetails(null);
    setErrorMessage("");
  };

  // Handler: open Join popup
  const handleOpenJoin = () => {
    setJoinCode("");
    setShowJoinPopup(true);
  };

  // Handler: join trip by code
  const handleJoinTrip = async () => {
    const allTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const tripFound = allTrips.find((t) => t.inviteCode === joinCode);

    if (!tripFound) {
      setErrorMessage("!! Invalid Trip Code !!");
      return;
    }

    if ((user.trips || []).includes(tripFound.id)) {
      setErrorMessage("!! You already joined the trip !!");
      return;
    }

    // Add trip to current user
    const updatedUser = {
      ...user,
      trips: [...(user.trips || []), tripFound.id],
      friends: Array.from(new Set([...(user.friends || []), tripFound.ownerId])),
    };

    // Also add friendship from owner side
    const updatedUsers = allUsers.map((u) => {
      if (u.id === tripFound.ownerId) {
        const ownerFriends = Array.from(new Set([...(u.friends || []), updatedUser.id]));
        return { ...u, friends: ownerFriends };
      }
      if (u.id === updatedUser.id) return updatedUser;
      return u;
    });

    // If logged-in user wasn't in users array, add them
    if (!updatedUsers.some((u) => u.id === updatedUser.id)) updatedUsers.push(updatedUser);

    persistAll({ updatedUser, updatedTrips: allTrips, updatedUsers });

    setTrips((prev) => [...prev, tripFound]);
    setShowJoinPopup(false);
    setErrorMessage("!! Trip joined Successfully !!");
    // refresh friends shown
    setFriendsList((prev) => {
      const owner = updatedUsers.find((u) => u.id === tripFound.ownerId);
      const newFriends = [...(prev || [])];
      if (owner && !newFriends.some((f) => f.id === owner.id)) newFriends.push(owner);
      return newFriends;
    });
    await updateDoc(doc(db, "users", updatedUser.id.toString()), {
      trips: updatedUser.trips,
      friends: updatedUser.friends
    });
    await updateDoc(doc(db, "users", tripFound.ownerId.toString()), {
      friends: Array.from(new Set([...(owner.friends || []), updatedUser.id]))
    });


  };

  // Handler: open Friends popup
  const handleOpenFriends = () => {
    setShowFriendsPopup(true);
  };

  // Handler: logout
    // If your app needs a redirect:
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  // Render
  return (
    <div>
      {/* NAVBAR */}
      <nav className="om-navbar">
        <div className="om-heading">OuterMiles</div>

        <div className="om-middle-buttons">
          <button
            className={`om-middle-button ${activeTab === "you" ? "om-middle-button-active" : ""}`}
            onClick={() => {
              setActiveTab("you");
              setErrorMessage("");
            }}
          >
            <i className="fas fa-user profile-icon"></i> You
          </button>

          <button
            className={`om-middle-button ${activeTab === "discover" ? "om-middle-button-active" : ""}`}
            onClick={() => {
              setActiveTab("discover");
              setErrorMessage("");
            }}
          >
            <i className="fa fa-compass" style={{ fontSize: 20 }}></i> Discover
          </button>
        </div>

        <div className="om-right-actions">
          <button className="om-join" onClick={handleOpenJoin}>
            <i className="fa-solid fa-user-group"></i> Join A trip
          </button>

          <button className="om-add" onClick={handleOpenAddTrip}>
            <svg viewBox="0 0 1024 1024" width="12" height="12" fill="white">
              <path d="M870.949 431.88h-279.089v-278.821c0-44.134-35.613-79.917-79.754-79.917s-79.734 35.783-79.734 79.936v278.994h-279.224c-44.14 0-80.024 35.783-80.005 79.936-0.019 22.058 8.893 42.279 23.336 56.719 14.462 14.479 34.415 23.623 56.456 23.623h279.437v278.604c0 22.082 8.758 42.072 23.22 56.488 14.463 14.46 34.357 23.413 56.437 23.413 44.121 0 79.83-35.781 79.83-79.901v-278.623h279.089c44.142 0 79.931-36.092 79.909-80.227-0.022-44.115-35.803-80.226-79.909-80.226z"></path>
            </svg>
            Add
          </button>
        </div>
      </nav>

      {/* MAIN */}
      {activeTab === "you" ? (
        <div className="om-container">
          {/* SIDEBAR */}
          <aside className="om-aside-profile">
            <div className="om-profile-pic">
              {/* <img className="om-profile" id="profile-photo" src={profilePic || "https://via.placeholder.com/100"} alt="Profile" /> */}
              <img src={user?.photo || profilePic} className="om-profile" alt="Profile"/>
            </div>

            {/* <h1 className="om-name" id="profile-name">{user?.name || "Guest User"}</h1>
            <h3 className="om-username" id="profile-username">@{user?.username || "guest_usr"}</h3> */}
            <h1 className="om-name">{user?.name}</h1>
            <h3 className="om-username">@{user?.username}</h3>

            <nav className="om-sidebar-nav">
              <div className="om-nav-item om-nav-item-active"><i className="fas fa-home"></i> Dashboard</div>
              <div className="om-nav-item" onClick={handleOpenFriends}><i className="fas fa-users"></i> Friends</div>
              <div className="om-nav-item" onClick={() => navigate('/budget')}><i className="fas fa-coins"></i> Budget</div>
            </nav>

            <br /><br /><br />
            <button className="btn btn-outline-danger ms-3" id="logout-btn" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
          </aside>

          {/* CONTENT */}
          <main className="om-content">
            <div className="om-card" id="trips-container">
              {trips.length === 0 ? (
                <div className="om-card1" id="no-trip">
                  <img src="https://www.stippl.io/assets/profile-trip-placeholder-b700979b.svg" width="200px" alt="placeholder" />
                  <h2>Create your first trip</h2>
                  <p>Planning is where the adventure starts. Create your first trip and start yours! 🚀</p>
                  <button className="om-add om-first-trip-button" onClick={handleOpenAddTrip}>Create first trip</button>
                  <hr width="90%" color="#c3cfe4" size="1px" />
                </div>
              ) : (
                <div id="trips-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                  {trips.map((t) => (
                    <div key={t.id} className="card" style={{ cursor: "pointer", margin: 12 }} onClick={() => handleShowTripDetails(t)}>
                      <img src={t.image} className="card-img-top" alt={t.name} />
                      <div className="card-body">
                        <h5 className="card-title">{t.name}</h5>
                        <p className="card-text">{t.country}<br />{t.startdate} → {t.enddate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      ) : (
        // DISCOVER / MAP
        <div className="container2" id="container2" style={{ height: "92%", width: "100%" }}>
          <iframe
            title="Discover Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/view?zoom=3&center=20.5937,78.9629&key=YOUR_API_KEY`}
          />
        </div>
      )}

      {/* POPUPS */}

      {/* Add Trip Popup */}
      {showTripForm && (
        <div className="om-create-trip-popup-new" style={{ display: "block" }}>
          <div className="form-container">
            <div className="form-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Trip name</h5>
                <button type="button" className="btn-close" onClick={() => setShowTripForm(false)}></button>
              </div>

              <div className="mb-3">
                <input id="trip-name" type="text" className="form-control" placeholder="Give your trip a name.." value={tripName} onChange={(e) => setTripName(e.target.value)} />
              </div>

              <h6>Which countries are you going?</h6>
              <div className="mb-3">
                <select className="form-select" id="trip-country" value={tripCountry} onChange={(e) => setTripCountry(e.target.value)}>
                  <option value="">Select countries..</option>
                  <option>India</option>
                  <option>Uae</option>
                  <option>France</option>
                  <option>Japan</option>
                </select>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <label className="form-label">Start date</label>
                  <input type="date" className="form-control" id="start-date" value={startDate} onChange={(e) => { setStartDate(e.target.value); if (endDate && e.target.value > endDate) setEndDate(""); }} />
                </div>
                <div className="col">
                  <label className="form-label">End date</label>
                  <input type="date" className="form-control" id="end-date" value={endDate} min={startDate || undefined} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              <small className="text-muted">Use this date range to set trip length. Exact dates won't be shown to audience.</small>

              <div style={{ marginTop: 16 }}>
                <button className="om-add" id="start-planning" onClick={handleCreateTrip}>Start planning</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Trip Popup */}
      {showJoinPopup && (
        <div className="om-create-trip-popup-new" style={{ display: "block" }}>
          <div className="form-container-join">
            <div className="form-section-join">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Trip Code</h5>
                <button type="button" className="btn-close" onClick={() => setShowJoinPopup(false)}></button>
              </div>

              <div className="mb-3">
                <input id="trip-code" type="text" className="form-control" placeholder="Enter trip code to join.." value={joinCode} onChange={(e) => setJoinCode(e.target.value)} />
              </div>

              <button className="om-add" id="join-trip-btn" onClick={handleJoinTrip}>Join</button>
            </div>
          </div>
        </div>
      )}

      {/* Trip Details Popup */}
      {showTripDetails && (
        <>
          {/* overlay */}
          <div
            onClick={() => setShowTripDetails(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              zIndex: 1990,
            }}
          />

          {/* right-side drawer */}
          <div
            id="trip-details-drawer"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100%",
              width: 380,
              maxWidth: "92%",
              background: "#fff",
              boxShadow: "-8px 0 32px rgba(0,0,0,0.2)",
              zIndex: 2000,
              overflowY: "auto",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0 }}>{showTripDetails.name}</h4>
              <button type="button" className="btn-close" onClick={() => setShowTripDetails(null)} aria-label="Close" />
            </div>

            <img
              src={showTripDetails.image}
              alt="trip"
              style={{ width: "100%", borderRadius: 8, objectFit: "cover", maxHeight: 220 }}
            />

            <div>
              <p style={{ margin: "8px 0" }}><strong>Dates:</strong> {showTripDetails.startdate} → {showTripDetails.enddate}</p>
              <p style={{ margin: "8px 0" }}><strong>Invite Code:</strong> {showTripDetails.inviteCode}</p>
            </div>

            <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", gap: 8 }}>
              <button
                className="btn btn-outline-danger"
                id="delete-btn"
                onClick={() => {
                  handleDeleteTrip(showTripDetails.id);
                }}
                style={{ flex: 1 }}
              >
                Delete Trip
              </button>

              <button className="btn btn-secondary" onClick={() => setShowTripDetails(null)} style={{ flex: 1 }}>
                Close
              </button>
            </div>
          </div>
        </>
      )}

      {/* Friends Popup */}
      {showFriendsPopup && (
        <div id="friend-list" className="om-create-trip-popup-new" style={{ display: "block" }}>
          <div className="form-container-join">
            <div className="form-section-join">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Friends</h5>
                <button type="button" className="btn-close" onClick={() => setShowFriendsPopup(false)}></button>
              </div>

              <div id="friends-list" style={{ marginTop: 8 }}>
                {friendsList.length ? friendsList.map((f) => (
                  <div key={f.id} className="friend-card">
                    <img src={f.photo || "https://via.placeholder.com/40"} alt={f.name} />
                    <span>{f.name} (@{f.username})</span>
                  </div>
                )) : <p>No friends yet</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error/Info Popup */}
      {errorMessage && (
        <div id="error-msg" className="om-create-trip-popup-new" style={{ display: "block" }}>
          <div className="form-container-join">
            <div className="form-section-join">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <button type="button" className="btn-close" onClick={() => setErrorMessage("")}></button>
              </div>
              <h5 id="err-msg">{errorMessage}</h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}