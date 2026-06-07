import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/profile.css";


const Profile = () => {
const { id } = useParams();

const [user, setUser] = useState(null);
const [createdTrips, setCreatedTrips] = useState([]);
const [joinedTrips, setJoinedTrips] = useState([]);
const [activeTab, setActiveTab] = useState("created");
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchProfile();
}, [id]);

const fetchProfile = async () => {
try {
const res = await API.get(`/profile/${id}`);


  setUser(res.data.user);
  setCreatedTrips(res.data.createdTrips || []);
  setJoinedTrips(res.data.joinedTrips || []);
} catch (err) {
  console.log(err);
} finally {
  setLoading(false);
}

};

if (loading) return <h2>Loading...</h2>;

if (!user) return <h2>User not found</h2>;

return ( <div className="profile-page">

  <div className="profile-cover"></div>

  <div className="profile-card">

    <img
      src={user.avatar}
      alt={user.name}
      className="profile-avatar"
    />

    <h1>{user.name}</h1>

    <p className="profile-bio">
      {user.bio}
    </p>

    <div className="profile-info">
      <p>📧 {user.email}</p>
      <p>📞 {user.phone}</p>
      <p>🌐 {user.website}</p>
    </div>
  </div>

  <div className="profile-tabs">

  <div className="tab-buttons">
    <button
      className={activeTab === "created" ? "active" : ""}
      onClick={() => setActiveTab("created")}
    >
      My Created Trips
    </button>

    <button
      className={activeTab === "joined" ? "active" : ""}
      onClick={() => setActiveTab("joined")}
    >
      Joined Trips
    </button>

    <button
      className={activeTab === "reviews" ? "active" : ""}
      onClick={() => setActiveTab("reviews")}
    >
      Reviews
    </button>
  </div>
  </div>


  <div className="trip-grid">

  {activeTab === "created" &&
    createdTrips.map((trip) => (
      <div
        key={trip.id}
        className="trip-card"
      >

        <Link
          to={`/trip/${trip.id}`}
          className="trip-link"
        >
          <img
            src={trip.cover_image}
            alt={trip.title}
          />

          <h3>{trip.title}</h3>

          <p>{trip.destination}</p>

          <span>
            {trip.start_date} - {trip.end_date}
          </span>
        </Link>

        <div className="trip-actions">

          <Link
            to={`/trip/${trip.id}`}
            className="btn-view"
          >
            View Trip
          </Link>

          <Link
            to={`/manage-trip/${trip.id}`}
            className="btn-manage"
          >
            Manage Trip
          </Link>

        </div>

      </div>
    ))}

  {activeTab === "joined" &&
    joinedTrips.map((trip) => (
      <Link
        key={trip.id}
        to={`/trip/${trip.id}`}
        className="trip-card trip-link"
      >
        <img
          src={trip.cover_image}
          alt={trip.title}
        />

        <h3>{trip.title}</h3>

        <p>{trip.destination}</p>

        <span>
          {trip.start_date} - {trip.end_date}
        </span>
      </Link>
    ))}

  {activeTab === "reviews" && (
    <div className="empty-review">
      Reviews coming soon...
    </div>
  )}

</div>

</div>


);
};

export default Profile;
