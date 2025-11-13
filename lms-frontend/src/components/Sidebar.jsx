import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">📚 Library</h2>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          Dashboard
        </NavLink>
        <NavLink to="/books" className={({ isActive }) => (isActive ? "active" : "")}>
          Books
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>
          Categories
        </NavLink>
        <NavLink to="/borrow-records" className={({ isActive }) => (isActive ? "active" : "")}>
          Borrow Records
        </NavLink>
        <NavLink to="/reviews" className={({ isActive }) => (isActive ? "active" : "")}>
          Reviews
        </NavLink>
        <NavLink to="/reservations" className={({ isActive }) => (isActive ? "active" : "")}>
          Reservations
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          Profile
        </NavLink>
      </nav>
    </div>
  );
}
