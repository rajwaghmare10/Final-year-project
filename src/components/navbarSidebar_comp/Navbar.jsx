import React, { useState, useEffect } from 'react'; 
import './Navbar.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../api/api';
import PurchaseCoins from './PurchaseCoins';

const Navbar = ({ toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCoins, setUserCoins] = useState(0);
  const [userDetails, setUserDetails] = useState(null); // Store user details
  const navigate = useNavigate();
  const [showCoinModal, setShowCoinModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user details
    setIsLoggedIn(!!token);

    if (user?.id) {
      fetchUserCoins(user.id);
    }
  }, []);

  const fetchUserCoins = async (userId) => {
    try {
      const userData = await getUserById(userId);
      setUserCoins(userData.user.coins);
      setUserDetails(userData.user);
    } catch (error) {
      console.error('Error fetching user coins:', error.message);
      setUserCoins(0);
    }
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUserDetails(null);
      setUserCoins(0);
      navigate('/login');
    } else {
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
            <div className="coin" onClick={() => setShowCoinModal(true)}>
              <i className="fa fa-coins"></i> {isLoggedIn ? userCoins : 0}
            </div>
            {showCoinModal && (
              <PurchaseCoins 
                closeModal={() => setShowCoinModal(false)} 
                userDetails={userDetails} 
                setUserCoins={setUserCoins} 
              />
            )}
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
