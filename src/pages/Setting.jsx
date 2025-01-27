import React, { useState, useEffect } from 'react';
import './Setting.css';  // Make sure to create or update the appropriate CSS for styling
import axios from 'axios';

const Setting = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    bgmi_id: '',
    email: '',
    coins: 0, // Optionally, display coins as well
  });
  const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch user details from localStorage or backend
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserDetails({
        username: user.name,
        bgmi_id: user.bgmi_id,
        email: user.email,
        coins: user.coins,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Call the API to update the user details
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        'http://localhost:4000/user/update', 
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Handle success
      setSuccessMessage('Details updated successfully!');
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Update localStorage
      setIsEditing(false);
    } catch (error) {
      setErrorMessage('Failed to update details. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="setting-container">
      <h2>User Settings</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="user-details">
        <div className="detail-item">
          <label>Email:</label>
          <p>{userDetails.email}</p>
        </div>

        <div className="detail-item">
          <label>Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
            />
          ) : (
            <p>{userDetails.username}</p>
          )}
        </div>

        <div className="detail-item">
          <label>BGMI ID:</label>
          {isEditing ? (
            <input
              type="number"
              name="bgmi_id"
              value={userDetails.bgmi_id}
              onChange={handleChange}
            />
          ) : (
            <p>{userDetails.bgmi_id}</p>
          )}
        </div>

        <div className="detail-item">
          <label>Coins:</label>
          <p>{userDetails.coins}</p>
        </div>

        {isEditing ? (
          <div className="action-buttons">
            <button className="save-btn" onClick={handleSave}>Save Changes</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Details</button>
        )}
      </div>
    </div>
  );
};

export default Setting;
