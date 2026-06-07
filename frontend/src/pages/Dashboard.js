import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import '../styles/dashboard.css';
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const res = await API.get("/trips");
      setTrips(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const joinTrip = async (tripId) => {
    try {
      const res = await API.post("/join-trip", {
        trip_id: tripId,
        user_id: user?.id
      });

      alert(res.data.message);
    } catch {
      alert("Join lỗi");
    }
  };
  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <span className="logo-icon">🧭</span>
            <div className="brand-text">
              <h1>TravelMate</h1>
              <p>Premium Travel SaaS</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <a href="#dashboard" className="nav-item active">
              <span className="nav-icon">📊</span> Dashboard
            </a>
            <a href="#my-trips" className="nav-item">
              <span className="nav-icon">✈️</span> My Trips
            </a>
            <a href="#discover" className="nav-item">
              <span className="nav-icon">🌍</span> Discover Trips
            </a>
            <a href="#buddies" className="nav-item">
              <span className="nav-icon">👥</span> Travel Buddies
            </a>
            <a href="#messages" className="nav-item">
              <span className="nav-icon">💬</span> Messages
            </a>
            <a href="#notifications" className="nav-item">
              <span className="nav-icon">🔔</span> Notifications
            </a>
          </div>

          <div className="nav-divider"></div>

          <div className="nav-group">
            <a href="#profile" className="nav-item">
              <span className="nav-icon">👤</span> Profile
            </a>
            <a href="#settings" className="nav-item">
              <span className="nav-icon">⚙️</span> Settings
            </a>
            <a href="#logout" className="nav-item logout">
              <span className="nav-icon">🚪</span> Logout
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-search">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search trips, buddies, or places..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn" aria-label="Messages">
              <span className="btn-icon">💬</span>
              <span className="badge-dot">3</span>
            </button>
            <button className="icon-btn" aria-label="Notifications">
              <span className="btn-icon">🔔</span>
              <span className="badge-dot blue"></span>
            </button>
            <div className="user-profile">
              <div className="user-info">
                <p className="user-name">{user?.name || "Traveler"}</p>
                <p className="user-rank">Travel Member</p>
              </div>
              <Link
  to={`/profile/${user.id}`}
  className="avatar-link"
>
  <img
    src={user.avatar}
    alt={user.name}
    className="user-avatar"
  />
</Link>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* Welcome Banner */}
          <section className="welcome-banner">
            <div className="banner-overlay"></div>
            <div className="banner-content">
              <h2>
                Welcome back, {user?.name || "Traveler"} 👋
              </h2>

              <p>
                Ready for your next adventure?
                There are {trips.length} available trips waiting for you.
              </p>
              <button className="btn-primary">Explore New Destinations ➜</button>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="stats-grid">

  <div className="stat-card">
    <div className="stat-icon-box bg-blue-soft">
      ✈️
    </div>

    <div className="stat-data">
      <p className="stat-label">Available Trips</p>
      <h3 className="stat-value">
        {trips.length}
      </h3>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon-box bg-green-soft">
      🌍
    </div>

    <div className="stat-data">
      <p className="stat-label">Destinations</p>
      <h3 className="stat-value">
        {new Set(trips.map(t => t.destination)).size}
      </h3>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon-box bg-orange-soft">
      👤
    </div>

    <div className="stat-data">
      <p className="stat-label">My Account</p>
      <h3 className="stat-value">
        #{user?.id}
      </h3>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon-box bg-red-soft">
      🔥
    </div>

    <div className="stat-data">
      <p className="stat-label">Open Trips</p>
      <h3 className="stat-value">
        {
          trips.filter(t => t.status === "open").length
        }
      </h3>
    </div>
  </div>

</section>

          <div className="content-layout">
            <div className="content-left">
              {/* Upcoming Trips */}
              <section className="dashboard-section">
                <div className="section-header">
                  <h3>Upcoming Trips</h3>
                  <a href="#all-trips" className="view-all">View all trips</a>
                </div>
                <div className="trips-grid">

  {trips.slice(0, 6).map((trip) => (

    <div
      className="trip-card"
      key={trip.id}
    >
      <div className="card-image">
        <img
          src={`https://source.unsplash.com/600x400/?travel,${trip.destination}`}
          alt={trip.destination}
        />

        <span className="badge badge-recruiting">
          {trip.status}
        </span>
      </div>

      <div className="card-body">

        <div className="card-title-row">
          <h4>{trip.title}</h4>

          <span className="slots">
            {trip.max_members || 0} slots
          </span>
        </div>

        <p className="card-date">
          📍 {trip.destination}
        </p>

        <div
  style={{
    display: "flex",
    gap: "10px"
  }}
>
  <button className="btn-outline" onClick={() => navigate(`/trip/${trip.id}`)}>Details</button>

  <button className="btn-primary-sm" onClick={() => joinTrip(trip.id)}>Join</button>
</div>

      </div>
    </div>

  ))}

</div>
              </section>

              {/* Recommended for You */}
              <section className="dashboard-section">
                <div className="section-header">
                  <h3>Recommended for You</h3>
                  <div className="slider-controls">
                    <button className="control-btn">‹</button>
                    <button className="control-btn">›</button>
                  </div>
                </div>
                <div className="recommendation-grid">
                  {trips.slice(0, 2).map((trip) => (
                    <div
                      className="recommendation-card"
                      key={trip.id}
                    >
                      <img
                        src={`https://source.unsplash.com/600x400/?${trip.destination}`}
                        alt={trip.destination}
                      />

                      <div className="rec-content">
                        <h4>{trip.title}</h4>

                        <p>
                          {trip.description?.substring(0, 100)}
                        </p>

                        <button
                          className="btn-primary-sm"
                          onClick={() => joinTrip(trip.id)}>Join Trip</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="content-right">
              {/* Quick Actions */}
              <section className="quick-actions-panel">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                 <button
                  className="action-btn"
                  onClick={() => navigate("/create-trip")}
                >
                  <span className="action-icon">➕</span>
                  Create Trip
                </button>
                  <button className="action-btn">
                    <span className="action-icon">🔎</span>
                    Find Buddies
                  </button>
                  <button className="action-btn">
                    <span className="action-icon">🗺️</span>
                    Explore
                  </button>
                  <button className="action-btn relative">
                    <span className="action-icon">💬</span>
                    Messages
                    <span className="notif-dot"></span>
                  </button>
                </div>
              </section>

              {/* Recent Activities */}
              <section className="activity-panel">
                <h3>Recent Activities</h3>
                <div className="activity-list">
                  {trips.slice(0, 4).map((trip) => (
                    <div
                      className="activity-item"
                      key={trip.id}
                    >
                      <div className="activity-dot dot-blue"></div>
                      <div className="activity-info">
                        <p>
                          New trip:
                          <strong> {trip.title}</strong>
                        </p>
                        <span>
                          {trip.destination}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="view-more-btn">View All Activity ▾</button>
                <button className="floating-add-btn">＋</button>
              </section>

              {/* Travel Tip */}
              <div className="travel-tip-card">
                <div className="tip-header">
                  <span className="tip-icon">💡</span>
                  <h4>Travel Tip of the Day</h4>
                </div>
                <p>Always carry a portable power bank and download offline maps before heading to remote areas in Bali.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

