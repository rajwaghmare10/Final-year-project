// Navbar.jsx
import React from 'react';
import './Navbar.css';
import Sidebar from './Sidebar';
import { useNavigate} from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const handletoLogin = () =>{
    navigate('/login');
  }
  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <button className="fa fa-bars" onClick={toggleSidebar}></button>
          <h3>XE ESPORTS</h3>
        </div>
        <div className="part">
          <div className="search">
            <input type="text" className="search-box" placeholder="Search..." name="search" />
            <i className="fa fa-search"></i>
          </div>
          <div className="login">
            <button className="lg-button" onClick={handletoLogin}>Login</button>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Navbar;
