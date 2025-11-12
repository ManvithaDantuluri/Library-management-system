import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import "../styles/borrowRecords.css";

export default function BorrowRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState([
    {
      id: 1,
      studentName: "John Doe",
      bookTitle: "Introduction to Algorithms",
      borrowDate: "2025-10-01",
      returnDate: "2025-10-15",
      status: "Returned",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      bookTitle: "Clean Code",
      borrowDate: "2025-10-10",
      returnDate: "2025-10-25",
      status: "Borrowed",
    },
    {
      id: 3,
      studentName: "Alan Walker",
      bookTitle: "Design Patterns",
      borrowDate: "2025-09-20",
      returnDate: "2025-10-05",
      status: "Overdue",
    },
  ]);

  const [newRecord, setNewRecord] = useState({
    studentName: "",
    bookTitle: "",
    borrowDate: "",
    returnDate: "",
    status: "Borrowed",
  });

  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All" || rec.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const handleAddRecord = () => {
    if (
      !newRecord.studentName ||
      !newRecord.bookTitle ||
      !newRecord.borrowDate ||
      !newRecord.returnDate
    )
      return alert("Please fill all fields.");

    const newEntry = {
      id: records.length + 1,
      ...newRecord,
    };

    setRecords([...records, newEntry]);
    setNewRecord({
      studentName: "",
      bookTitle: "",
      borrowDate: "",
      returnDate: "",
      status: "Borrowed",
    });
    setShowModal(false);
  };

  return (
    <div className="borrow-page-container">
      <div className="borrow-header">
        <div>
          <h2>Borrow Records</h2>
          <p className="subtitle">View and manage all borrow transactions</p>
        </div>

        <div className="header-actions">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search by student, book, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Add Record
          </button>
        </div>
      </div>

      <div className="filter-bar">
        {["All", "Returned", "Borrowed", "Overdue"].map((category) => (
          <button
            key={category}
            className={`filter-btn ${
              filter === category ? "active-filter" : ""
            }`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="table-card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Book Title</th>
              <th>Borrow Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.id}</td>
                  <td>{rec.studentName}</td>
                  <td>{rec.bookTitle}</td>
                  <td>{rec.borrowDate}</td>
                  <td>{rec.returnDate}</td>
                  <td>
                    <span className={`status-tag ${rec.status.toLowerCase()}`}>
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-records">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Borrow Record</h3>
            <input
              type="text"
              placeholder="Student Name"
              value={newRecord.studentName}
              onChange={(e) =>
                setNewRecord({ ...newRecord, studentName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Book Title"
              value={newRecord.bookTitle}
              onChange={(e) =>
                setNewRecord({ ...newRecord, bookTitle: e.target.value })
              }
            />
            <label>Borrow Date</label>
            <input
              type="date"
              value={newRecord.borrowDate}
              onChange={(e) =>
                setNewRecord({ ...newRecord, borrowDate: e.target.value })
              }
            />
            <label>Return Date</label>
            <input
              type="date"
              value={newRecord.returnDate}
              onChange={(e) =>
                setNewRecord({ ...newRecord, returnDate: e.target.value })
              }
            />
            <label>Status</label>
            <select
              value={newRecord.status}
              onChange={(e) =>
                setNewRecord({ ...newRecord, status: e.target.value })
              }
            >
              <option>Borrowed</option>
              <option>Returned</option>
              <option>Overdue</option>
            </select>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleAddRecord}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
