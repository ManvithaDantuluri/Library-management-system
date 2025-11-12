import React from "react";
import Layout from "../components/Layout";
import "../styles/dashboard.css";
import { FaBook, FaUserFriends, FaClipboardList, FaCalendarCheck } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    { title: "Total Books", value: 256, icon: <FaBook />, color: "#007bff" },
    { title: "Active Borrowers", value: 89, icon: <FaUserFriends />, color: "#28a745" },
    { title: "Reservations", value: 23, icon: <FaClipboardList />, color: "#ffc107" },
    { title: "Due Returns", value: 12, icon: <FaCalendarCheck />, color: "#dc3545" },
  ];

  return (
    <Layout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">📊 Dashboard Overview</h2>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card" style={{ borderLeftColor: s.color }}>
              <div className="stat-icon" style={{ backgroundColor: s.color + "22" }}>
                {s.icon}
              </div>
              <div className="stat-info">
                <h3>{s.value}</h3>
                <p>{s.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card dashboard-section">
          <h3>📚 Recent Borrow Activity</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Book</th>
                <th>Borrower</th>
                <th>Date Borrowed</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Clean Code</td>
                <td>John Doe</td>
                <td>Oct 20, 2025</td>
                <td>Nov 3, 2025</td>
              </tr>
              <tr>
                <td>Algorithms Unlocked</td>
                <td>Jane Smith</td>
                <td>Oct 23, 2025</td>
                <td>Nov 6, 2025</td>
              </tr>
              <tr>
                <td>AI Superpowers</td>
                <td>Chris Evans</td>
                <td>Oct 25, 2025</td>
                <td>Nov 9, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card chart-placeholder">
          <h3>📈 Borrow Trends</h3>
          <div className="chart-box">
            <p>Chart visualization will appear here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
