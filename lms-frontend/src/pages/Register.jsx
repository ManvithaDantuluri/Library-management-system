import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "", // ✅ added username field
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register", formData);
      alert("✅ Registration successful!");
      console.log("Server response:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("❌ Registration failed:", error);
      alert(error.response?.data || "Error registering user. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2 className="register-title">Create an Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="STUDENT">Student</option>
              <option value="LIBRARIAN">Librarian</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>

          <p className="redirect-text">
            Already have an account?{" "}
            <a href="/login" className="login-link">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
