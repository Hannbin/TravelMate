import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const MyTrips = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [createdTrips, setCreatedTrips] = useState([]);
  const [joinedTrips, setJoinedTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {

    const res = await API.get(`/my-trips/${user.id}`);

    setCreatedTrips(res.data.createdTrips);
    setJoinedTrips(res.data.joinedTrips);
  };

  return (
    <div className="container">

      <h1>My Created Trips</h1>

      {createdTrips.map(trip => (

        <Link
          key={trip.id}
          to={`/trip/${trip.id}`}
        >
          {trip.title}
        </Link>

      ))}

      <hr />

      <h1>Joined Trips</h1>

      {joinedTrips.map(trip => (

        <Link
          key={trip.id}
          to={`/trip/${trip.id}`}
        >
          {trip.title}
        </Link>

      ))}

    </div>
  );
};

export default MyTrips; 