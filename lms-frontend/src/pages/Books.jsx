// src/pages/Books.jsx
import React, { useState } from "react";
import "../styles/books.css";

const Books = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", status: "Available" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", status: "Borrowed" },
    { id: 3, title: "1984", author: "George Orwell", category: "Dystopian", status: "Available" },
  ]);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    status: "Available",
  });

  // Filtered results based on search + category
  const filteredBooks = books.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" || b.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddBook = (e) => {
    e.preventDefault();
    const nextId = books.length ? books[books.length - 1].id + 1 : 1;
    const bookToAdd = { id: nextId, ...newBook };
    setBooks([...books, bookToAdd]);
    setNewBook({ title: "", author: "", category: "", status: "Available" });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="books-container">
      <div className="books-header">
        <h2>Books</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Book
        </button>
      </div>

      <div className="books-controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All Categories</option>
          <option>Fiction</option>
          <option>Classic</option>
          <option>Dystopian</option>
        </select>
      </div>

      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>
                  <span
                    className={`status ${
                      book.status === "Available" ? "available" : "borrowed"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-books">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* --- Add Book Modal --- */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Add New Book</h3>
            <form onSubmit={handleAddBook}>
              <label>Title</label>
              <input
                type="text"
                value={newBook.title}
                onChange={(e) =>
                  setNewBook({ ...newBook, title: e.target.value })
                }
                required
              />

              <label>Author</label>
              <input
                type="text"
                value={newBook.author}
                onChange={(e) =>
                  setNewBook({ ...newBook, author: e.target.value })
                }
                required
              />

              <label>Category</label>
              <input
                type="text"
                value={newBook.category}
                onChange={(e) =>
                  setNewBook({ ...newBook, category: e.target.value })
                }
                required
              />

              <label>Status</label>
              <select
                value={newBook.status}
                onChange={(e) =>
                  setNewBook({ ...newBook, status: e.target.value })
                }
              >
                <option value="Available">Available</option>
                <option value="Borrowed">Borrowed</option>
              </select>

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;