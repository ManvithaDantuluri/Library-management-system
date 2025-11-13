import React, { useState } from "react";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Manvitha Dantuluri",
    email: "manvitha@example.com",
    role: "Student",
    joinedDate: "2023-08-15",
    totalBooksBorrowed: 12,
    activeReservations: 2,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(user);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => {
    setUser(editData);
    setIsModalOpen(false);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <h2>Profile</h2>
        <p className="subtitle">View and manage your personal details</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <h3 className="user-name">{user.name}</h3>
            <p className="user-role">{user.role}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="label">Joined Date:</span>
            <span className="value">{user.joinedDate}</span>
          </div>
          <div className="detail-row">
            <span className="label">Books Borrowed:</span>
            <span className="value">{user.totalBooksBorrowed}</span>
          </div>
          <div className="detail-row">
            <span className="label">Active Reservations:</span>
            <span className="value">{user.activeReservations}</span>
          </div>
        </div>

        <button className="edit-btn" onClick={() => setIsModalOpen(true)}>
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleEditChange}
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
