import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
    setEmail("");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2 className="auth-title">Forgot Password?</h2>
        <p className="auth-subtitle">
          Enter your registered email address and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Send Reset Link
          </button>
        </form>

        <p className="switch-text">
          Remembered your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
