import React, { useState, useEffect, useContext } from 'react';
import { togglecontext } from '../context/context';
import './Setting.css';
import { getUserById, updateUser } from '../api/api';

const Setting = () => {
  const isOpen = useContext(togglecontext);
  const [userDetails, setUserDetails] = useState({
    username: '',
    bgmi_id: '',
    email: '',
    coins: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id; 
        const response = await getUserById(userId);
        setUserDetails({
          username: response.user.username,
          bgmi_id: response.user.bgmi_id,
          email: response.user.email,
          coins: response.user.coins,
        });
      } catch (error) {
        setErrorMessage('Failed to fetch user details. Please try again.');
      }
    };

    fetchUserDetails();
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
      const userId = JSON.parse(localStorage.getItem('user')).id;
      await updateUser(userId, userDetails); // Call the update API
      setSuccessMessage('Details updated successfully!');
      localStorage.setItem('user', JSON.stringify({ ...userDetails, id: userId })); // Update localStorage
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
    <div className={`setting-container ${isOpen ? 'sidebar-open' : ''}`}>
      <h2>User Settings</h2>
      {errorMessage && <p className="setting-error-message">{errorMessage}</p>}
      {successMessage && <p className="setting-success-message">{successMessage}</p>}

      <div className="setting-user-details">
        <div className="setting-detail-item">
          <label>Email:</label>
          <p>{userDetails.email}</p>
        </div>

        <div className="setting-detail-item">
          <label>Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              className="setting-input"
              value={userDetails.username}
              onChange={handleChange}
            />
          ) : (
            <p>{userDetails.username}</p>
          )}
        </div>

        <div className="setting-detail-item">
          <label>BGMI ID:</label>
            <p>{userDetails.bgmi_id}</p>
        </div>

        <div className="setting-detail-item">
          <label>Coins:</label>
          <p>{userDetails.coins}</p>
        </div>

        {isEditing ? (
          <div className="setting-action-buttons">
            <button className="setting-save-btn" onClick={handleSave}>
              Save Changes
            </button>
            <button className="setting-cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="setting-edit-btn" onClick={() => setIsEditing(true)}>
            Edit Details
          </button>
        )}
      </div>
    </div>
  );
};

export default Setting;
