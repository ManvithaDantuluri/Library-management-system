import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      {/* Left brand */}
      <div className="nav-brand">📘 LMS</div>

      {/* Center links */}
      <div className="nav-links">
        <Link to="/books">Books</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/borrow-records">Borrow Records</Link>
        <Link to="/reservations">Reservations</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/profile">Profile</Link>
      </div>

      {/* Right logout button */}
      {user && (
        <div className="nav-actions">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
