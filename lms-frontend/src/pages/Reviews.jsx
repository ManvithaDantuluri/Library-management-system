import React, { useState } from "react";
import "../styles/reviews.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      studentName: "John Doe",
      bookTitle: "Clean Code",
      rating: 5,
      comment: "Excellent book for developers!",
      date: "2025-10-10",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      bookTitle: "Design Patterns",
      rating: 4,
      comment: "Very informative and well structured.",
      date: "2025-10-12",
    },
    {
      id: 3,
      studentName: "Alan Walker",
      bookTitle: "Introduction to Algorithms",
      rating: 3,
      comment: "Good content, but quite complex.",
      date: "2025-10-15",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    studentName: "",
    bookTitle: "",
    rating: "",
    comment: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newReview.studentName ||
      !newReview.bookTitle ||
      !newReview.rating ||
      !newReview.comment ||
      !newReview.date
    ) {
      alert("Please fill all fields!");
      return;
    }

    const newId = reviews.length + 1;
    setReviews([...reviews, { id: newId, ...newReview }]);
    setShowModal(false);
    setNewReview({
      studentName: "",
      bookTitle: "",
      rating: "",
      comment: "",
      date: "",
    });
  };

  return (
    <div className="reviews-page">
      <div className="header-row">
        <div>
          <h2>Book Reviews</h2>
          <p className="subtitle">View and manage student reviews</p>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Review
        </button>
      </div>

      <div className="table-card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Book Title</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.studentName}</td>
                <td>{review.bookTitle}</td>
                <td>
                  <span className="rating-stars">
                    {"⭐".repeat(review.rating)}
                  </span>
                </td>
                <td>{review.comment}</td>
                <td>{review.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Modal ---------- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Review</h3>
            <form onSubmit={handleSubmit}>
              <label>Student Name</label>
              <input
                type="text"
                name="studentName"
                value={newReview.studentName}
                onChange={handleChange}
              />

              <label>Book Title</label>
              <input
                type="text"
                name="bookTitle"
                value={newReview.bookTitle}
                onChange={handleChange}
              />

              <label>Rating (1–5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={newReview.rating}
                onChange={handleChange}
              />

              <label>Comment</label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleChange}
              ></textarea>

              <label>Date</label>
              <input
                type="date"
                name="date"
                value={newReview.date}
                onChange={handleChange}
              />

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
