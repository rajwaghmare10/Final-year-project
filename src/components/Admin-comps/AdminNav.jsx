import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNav.css";

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication details from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="admin-navbar">
      <div className="nav-brand">
        <NavLink to="/admin" className="admin-nav-link">
          <h2>Admin Dashboard</h2>
        </NavLink>
      </div>
      <div className="admin-nav-links">
        <NavLink to="/admin/tournamentManagement" className="admin-nav-link">
          Tournaments
        </NavLink>
        <NavLink to="/admin/teams" className="admin-nav-link">
          Teams
        </NavLink>
        <NavLink to="/admin/user" className="admin-nav-link">
          Users
        </NavLink>
        <NavLink to="/admin/scrims" className="admin-nav-link">
          Scrims
        </NavLink>
      </div>
      <div className="nav-profile">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminNav;
