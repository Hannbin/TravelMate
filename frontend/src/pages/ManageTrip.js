import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/manageTrip.css";
import { Link } from "react-router-dom";

const ManageTrip = () => {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [approvedMembers, setApprovedMembers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await API.get(`/manage-trip/${id}`);

    setTrip(res.data.trip);
    setPendingMembers(res.data.pendingMembers);
    setApprovedMembers(res.data.approvedMembers);
  };

  const approveMember = async (userId) => {
    await API.post("/approve-member", {
      trip_id: id,
      user_id: userId,
    });

    alert("Approved!");
    loadData();
  };

  return (
  <div className="manage-trip-page">

    <div className="manage-header">
      <h1>{trip?.title}</h1>
      <p>Manage trip members and requests</p>
    </div>

    <div className="trip-stats">

      <div className="stat-box">
        <h3>{pendingMembers.length}</h3>
        <p>Pending</p>
      </div>

      <div className="stat-box">
        <h3>{approvedMembers.length}</h3>
        <p>Approved</p>
      </div>

      <div className="stat-box">
        <h3>{trip?.max_members}</h3>
        <p>Max Members</p>
      </div>

    </div>

    <div className="manage-layout">

      {/* LEFT */}

      <div className="manage-card">

        <h2>Pending Requests</h2>

        {pendingMembers.length === 0 ? (

          <div className="empty-box">
            No pending requests
          </div>

        ) : (

          pendingMembers.map(member => (

            <div
              key={member.id}
              className="member-item"
            >

              <div className="member-left">

                <img
                  src={member.avatar}
                  alt={member.name}
                  className="member-avatar"
                />

                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p>Waiting for approval</p>
                </div>

              </div>

              <div className="member-actions">

                <button
                  className="btn-approve"
                  onClick={() => approveMember(member.id)}
                >
                  Approve
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* RIGHT */}

      <div className="manage-card">

        <h2>Approved Members</h2>

        {approvedMembers.length === 0 ? (

          <div className="empty-box">
            No approved members
          </div>

        ) : (

          approvedMembers.map(member => (

            <div
              key={member.id}
              className="approved-member"
            >

              <img
                src={member.avatar}
                alt={member.name}
              />

              <span>
                {member.name}
              </span>

            </div>

          ))

        )}

      </div>

    </div>

  </div>
);
};

export default ManageTrip;