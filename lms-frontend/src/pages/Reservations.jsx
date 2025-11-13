import React from "react";
import "../styles/reservations.css";

const Reservations = () => {
  const reservations = [
    {
      id: 1,
      user: "Manvitha Dantuluri",
      book: "Data Structures in Java",
      date: "2025-10-25",
      status: "pending",
    },
    {
      id: 2,
      user: "Aarav Mehta",
      book: "Operating Systems Concepts",
      date: "2025-10-20",
      status: "completed",
    },
    {
      id: 3,
      user: "Saanvi Rao",
      book: "Introduction to Algorithms",
      date: "2025-10-18",
      status: "cancelled",
    },
  ];

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <h2>Reservations</h2>
        <p className="subtitle">View and manage all active and past reservations</p>
      </div>

      {/* Table Section */}
      <div className="table-card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Book Title</th>
              <th>Reservation Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={reservation.id}>
                <td>{index + 1}</td>
                <td>{reservation.user}</td>
                <td>{reservation.book}</td>
                <td>{reservation.date}</td>
                <td>
                  <span className={`status-tag ${reservation.status}`}>
                    {reservation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
