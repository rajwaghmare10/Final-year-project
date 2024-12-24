import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminNav.css";

const AdminNav = () => {
  return (
    <div className="admin-navbar">
      <div className="nav-brand">
        <NavLink to="/admin" className="admin-nav-link">
          <h2>Admin Dashboard</h2>
        </NavLink>
      </div>
      <div className="admin-nav-links"> {/* Fixed typo */}
        <NavLink to="/admin/tournamentManagement" className="admin-nav-link">
          Tournaments
        </NavLink>
        <NavLink to="/admin/teams" className="admin-nav-link">
          Teams
        </NavLink>
        <NavLink to="/admin/users" className="admin-nav-link">
          Users
        </NavLink>
        <NavLink to="/admin/registrations" className="admin-nav-link">
          Registrations
        </NavLink>
      </div>
      <div className="nav-profile">
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default AdminNav;
