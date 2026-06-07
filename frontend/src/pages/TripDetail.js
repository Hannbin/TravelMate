import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/tripDetail.css";
import { Link } from "react-router-dom";

const TripDetail = () => {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(
  localStorage.getItem("user")
);
const handleJoinTrip = async () => {
  try {

    const res = await API.post("/join-trip", {
      trip_id: trip.id,
      user_id: user.id
    });

    alert(res.data.message);

  } catch (err) {
    console.log(err);
    alert("Join failed");
  }
};

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      const res = await API.get(`/trip/${id}`);

      setTrip(res.data.trip);
      setMembers(res.data.members || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="trip-loading">Loading...</div>;
  }

  if (!trip) {
    return <div className="trip-error">Trip not found</div>;
  }

  return (
    <div className="trip-detail-page">

      {/* HERO */}
      <header className="trip-hero">
        <div className="hero-overlay">

          <img
            src={
              trip.cover_image ||
              `https://source.unsplash.com/1600x900/?${trip.destination},travel`
            }
            alt={trip.destination}
            className="hero-img"
          />

          <div className="hero-gradient"></div>

          <div className="hero-content">
            <div>
              <h1 className="hero-title">
                {trip.title}
              </h1>

             
            </div>

            {user?.id === trip.user_id ? (

  <Link
    to={`/manage-trip/${trip.id}`}
    className="btn-join"
  >
    Manage Trip
  </Link>

) : (

  <button
    className="btn-join"
    onClick={handleJoinTrip}
  >Join Trip</button>)}
          </div>

        </div>
      </header>

      <main className="trip-main">

        <div className="main-container">

          <div className="content-grid">

            {/* LEFT */}
            <div className="column-left">

              {/* Description */}
              <section className="detail-card">

                <h2 className="card-title">
                  Trip Description
                </h2>

                <h3 className="trip-subtitle">
                  {trip.title}
                </h3>

                <p className="trip-description">
                  {trip.description}
                </p>

              </section>

              {/* Itinerary */}
              <section className="detail-card">

                <h2 className="card-title">
                  Itinerary
                </h2>

                <div className="itinerary-timeline">
  {(trip.itinerary||"").split("Ngày").filter(Boolean).map((item, index, arr) => (
    <div className="timeline-item" key={index}>

      <div className="timeline-marker">
        <span className="marker-circle"></span>

        {index !== arr.length - 1 && (
          <span className="marker-line"></span>
        )}
      </div>

      <div className="timeline-content">
        <span className="timeline-day">
          Ngày{item.split(":")[0]}
        </span>

        <p className="timeline-activity">
          {item.split(":")[1]}
        </p>
      </div>

    </div>
  ))}
</div>

              </section>

              {/* Cost */}
              <section className="detail-card">

                <h2 className="card-title">
                  Estimated Costs
                </h2>

                <div className="cost-info">

                  <div className="cost-row">
                    <span className="cost-label">
                      Budget:
                    </span>

                    <span className="cost-value">
                      {trip.budget || "Updating"}
                    </span>
                  </div>

                  <div className="cost-list-section">
                    <h4>Includes</h4>

                    <p>
                      {trip.includes || "Not specified"}
                    </p>
                  </div>

                  <div className="cost-list-section">
                    <h4>Excludes</h4>

                    <p>
                      {trip.excludes || "Not specified"}
                    </p>
                  </div>

                </div>

              </section>

            </div>

            {/* RIGHT */}
            <div className="column-right">

              <aside className="sticky-sidebar">

                {/* Host */}
                <section className="detail-card host-card">

                  <h2 className="card-title">
                    Host Profile
                  </h2>
                  

                  <div className="host-header">

                    <img
                      src={
                        trip.host_avatar ||
                        "https://ui-avatars.com/api/?name=" +
                        trip.host_name
                      }
                      alt={trip.host_name}
                      className="host-avatar"
                    />

                    <div>
                      <h4 className="host-name">
                        {trip.host_name}
                      </h4>

                      <p>
                        {trip.host_email}
                      </p>

                      
                    </div>
                      
                  </div>
                      <p className="host-bio">
                        {trip.host_bio}
                      </p>
                      <br />
                  <button className="btn-message">
                    Contact Host
                  </button>

                </section>

                {/* Members */}
                <section className="detail-card members-card">

                  <h2 className="card-title">
                    Members ({members.length})
                  </h2>

                  <div className="members-grid">

                  {members.slice(0, 5).map((member, index) => (
                    <div className="member-item" key={member.id || index}>
                      <img
                        src={
                          member.avatar ||
                          `https://ui-avatars.com/api/?name=${member.name}`
                        }
                        className="member-avatar"
                        alt={member.name}
                      />

                      <span className="member-name">
                        {member.name}
                      </span>
                    </div>
                  ))}

                  {members.length > 5 && (
                    <div className="member-more">
                      +{members.length - 5} more
                    </div>
                  )}

                </div>

                </section>

                

              </aside>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default TripDetail;