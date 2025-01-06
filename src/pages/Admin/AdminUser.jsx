import React, { useState } from 'react';
import { getUserById, updateUser } from '../../api/api';
import './AdminUser.css';

const AdminUser = () => {
  const [editId, setEditId] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [userDetails, setUserDetails] = useState({
    bgmi_id: '',
    username: '',
    email: '',
    role: '',
    coins: '',
    created_at: '',
    status: '',
  });

  const resetForm = () => {
    setUserDetails({
      bgmi_id: '',
      username: '',
      email: '',
      role: '',
      coins: '',
      created_at: '',
      status: '',
    });
    setEditId('');
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchUserDetails = async (e) => {
    setSuccessMessage(null);
    e.preventDefault();
    if (!editId) {
      setError('Please enter a valid BGMI ID.');
      return;
    }

    try {
      const { user } = await getUserById(editId);

      const formattedJoiningDate = user.created_at.split('T')[0];
      setUserDetails({ ...user, created_at: formattedJoiningDate });
      setError(null);
    } catch (err) {
      setError('Failed to fetch user data. Please check the ID.');
      resetForm();
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();

    try {
      await updateUser(editId, userDetails);
      setSuccessMessage('User details updated successfully.');
      setError(null);
      resetForm();
    } catch (err) {
      setError('Failed to update user details.');
    }
  };

  return (
    <div className="admin-user-container">
      <h1>Admin User Management</h1>

      <form onSubmit={fetchUserDetails}>
        <div className="admin-user__form-group">
          <label>BGMI ID</label>
          <input
            type="text"
            placeholder="Enter User ID"
            value={editId}
            onChange={(e) => setEditId(e.target.value)}
          />
          <button type="submit">Fetch Details</button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="admin-user__form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={userDetails.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="admin-user__form-group">
          <label>Email ID</label>
          <input
            type="text"
            placeholder="Enter Email ID"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="admin-user__form-group">
          <label>Role</label>
          <div className="radio-group">
            {['user', 'admin'].map((role) => (
              <label key={role}>
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={userDetails.role === role}
                  onChange={handleInputChange}
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="admin-user__form-group">
          <label>Coins</label>
          <input
            type="number"
            placeholder="Enter Coins"
            name="coins"
            value={userDetails.coins}
            onChange={handleInputChange}
          />
        </div>

        <div className="admin-user__form-group">
          <label>Joining Date</label>
          <input
            type="date"
            name="created_at"
            value={userDetails.created_at}
            onChange={handleInputChange}
          />
        </div>

        <div className="admin-user__form-group">
          <label>Status</label>
          <div className="radio-group">
            {['active', 'banned', 'delete'].map((status) => (
              <label key={status}>
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={userDetails.status === status}
                  onChange={handleInputChange}
                />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" onClick={updateUserDetails}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default AdminUser;
