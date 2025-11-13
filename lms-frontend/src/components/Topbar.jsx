import React from 'react'
import '../styles/Topbar.css'
import { useNavigate } from 'react-router-dom'

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored login info if needed
    localStorage.removeItem('authToken');
    navigate('/login'); // navigate back to login page
  };

  return (
    <div className="topbar">
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>
      <h2 className="topbar-title">Library Management System</h2>

      <div className="topbar-right">
        <div className="topbar-user">
          <img src="https://i.pravatar.cc/40" alt="user" className="user-avatar" />
          <span>Admin</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Topbar
