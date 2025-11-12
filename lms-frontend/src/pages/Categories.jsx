import React from "react";
import "../styles/categories.css";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Computer Science",
      description: "Books related to programming, algorithms, and data structures",
      totalBooks: 48,
    },
    {
      id: 2,
      name: "Mathematics",
      description: "Books on calculus, statistics, and linear algebra",
      totalBooks: 32,
    },
    {
      id: 3,
      name: "Physics",
      description: "Books covering classical mechanics, quantum theory, and optics",
      totalBooks: 27,
    },
    {
      id: 4,
      name: "Literature",
      description: "Novels, poems, and literary analysis resources",
      totalBooks: 54,
    },
  ];

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <h2>Categories</h2>
        <p className="subtitle">
          Browse and manage all book categories in the library
        </p>
      </div>

      {/* Table Section */}
      <div className="table-card">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Total Books</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{category.totalBooks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
