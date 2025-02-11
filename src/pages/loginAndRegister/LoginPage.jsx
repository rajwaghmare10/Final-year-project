import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import "./Login.css";
import { login } from "../../api/api";

const LoginPage = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract message from query parameters
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    if (message) {
      setErrorMessage(message);
      // Hide the message after 5 seconds
      setTimeout(() => setErrorMessage(""), 5000);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setLoading(true); // Show loading state

    if (!email || !password) {
      setErrorMessage("Please fill in both fields");
      setLoading(false);
      return;
    }

    try {
      // Call the login API
      const response = await login({ email, password });
      const { token, user } = response;

      // Save token and user details to localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Optionally, update parent component login state
      if (handleLogin) {
        handleLogin(user);
      }

      // Check user role
      if (user.role === "admin") {
        setShowRoleModal(true); // Show modal for admin to choose page
      } else {
        navigate("/"); // Redirect normal users to home page
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = (role) => {
    setShowRoleModal(false);
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {/* Show error message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="signup-link fplink">
            <NavLink to="/updatepassword">Forgot Password?</NavLink>
          </p>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </p>
      </div>

      {/* Admin Role Selection Modal */}
      {showRoleModal && (
        <div className="role-selection-modal">
          <div className="modal-content">
            <h3>Choose Your Role</h3>
            <button className="role-btn" onClick={() => handleRoleSelection("admin")}>
              Admin Panel
            </button>
            <button className="role-btn" onClick={() => handleRoleSelection("user")}>
              User Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
