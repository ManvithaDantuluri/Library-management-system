import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user details from backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT token stored on login
        if (!token) {
          console.error("No token found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:8082/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setEditData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:8082/api/users/update", editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(editData);
      setIsModalOpen(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data found. Please login again.</p>;

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
            <span className="value">
              {new Date(user.joinedDate).toLocaleDateString()}
            </span>
          </div>
          <div className="detail-row">
            <span className="label">Books Borrowed:</span>
            <span className="value">{user.totalBooksBorrowed || 0}</span>
          </div>
          <div className="detail-row">
            <span className="label">Active Reservations:</span>
            <span className="value">{user.activeReservations || 0}</span>
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
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
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
