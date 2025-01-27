import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [userCoins, setUserCoins] = useState(0); // State to track user's coins
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking for a token in localStorage
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user details from localStorage
    setIsLoggedIn(!!token);

    // Set the user's coins if user data is available
    if (user && user.coins !== undefined) {
      setUserCoins(user.coins); // Assuming the user object contains a `coins` property
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Logout logic
      localStorage.removeItem('authToken'); // Remove the token
      localStorage.removeItem('user'); // Remove user details
      setIsLoggedIn(false); // Update login state
      setUserCoins(0); // Reset coins to 0
      navigate('/login'); // Redirect to login page
    } else {
      // Redirect to login page
      navigate('/login');
    }
  };

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
          <div className="login-coin-container">
            {/* Coin Display */}
            <div className="coin">
              <i className="fa fa-coins"></i> {isLoggedIn ? userCoins : 0}
            </div>
            {/* Login/Logout Button */}
            <div className="login">
              <button className="lg-button" onClick={handleLoginLogout}>
                {isLoggedIn ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Navbar;
