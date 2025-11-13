// src/utils/jwtUtils.js
import { jwtDecode } from "jwt-decode";

// ✅ Decode JWT token
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// ✅ Check if token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false; // token without expiry
    const currentTime = Date.now() / 1000; // convert ms to seconds
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Token expiration check failed:", error);
    return true;
  }
};
