import React, { useState } from 'react';
import {
  addScrim,
  editScrim,
  getScrimById,
  deleteScrim,
} from '../../api/api'; // Import necessary API functions for scrims
import './AdminScrim.css'; // Scoped CSS file

const AdminScrim = () => {
  const [scrimData, setScrimData] = useState({
    scrim_name: '',
    total_slots: '',
    start_date: '',
    end_date: '',
    map: '',
    room_id: '',
    room_password: '',
    game_mode: '',
  });

  const [editId, setEditId] = useState(''); // For ID input
  const [error, setError] = useState(null);
  const [action, setAction] = useState(''); // Tracks the selected action (Add, Edit, Delete)

  // Reset form fields
  const resetForm = () => {
    setScrimData({
      scrim_name: '',
      total_slots: '',
      start_date: '',
      end_date: '',
      map: '',
      room_id: '',
      room_password: '',
      game_mode: '',
    });
    setEditId('');
    setError(null);
  };

  // Fetch scrim details for editing
  const fetchScrimDetails = async () => {
    try {
      const response = await getScrimById(editId);
      const scrim = response.scrim;

      // Format dates to YYYY-MM-DD
      const formattedStartDate = scrim.start_date.split('T')[0];
      const formattedEndDate = scrim.end_date.split('T')[0];

      setScrimData({
        ...scrim,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch scrim data. Please check the ID.');
      resetForm();
    }
  };

  // Handle action change (Add/Edit/Delete)
  const handleActionChange = (e) => {
    setAction(e.target.value);
    setError(null);
    if (e.target.value !== 'edit') {
      resetForm(); // Reset the form for actions other than edit
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setScrimData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle ID input change for Edit/Delete
  const handleEditIdChange = (e) => {
    setEditId(e.target.value);
  };

  // Handle form submission (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...scrimData,
        room_id: scrimData.room_id.trim() === '' ? null : scrimData.room_id.trim(),
        room_password: scrimData.room_password.trim() === '' ? null : scrimData.room_password.trim(),
      };

      if (action === 'edit') {
        await editScrim(editId, dataToSubmit);
        alert('Scrim updated successfully!');
      } else if (action === 'add') {
        await addScrim(dataToSubmit);
        alert('Scrim added successfully!');
      }
      resetForm();
    } catch (err) {
      console.error('Error Details:', err); // Log the error
      setError(err.message || 'Error while submitting the scrim.');
    }
  };

  // Handle scrim deletion
  const handleDelete = async () => {
    try {
      await deleteScrim(editId);
      alert('Scrim deleted successfully!');
      resetForm();
    } catch (err) {
      setError('Error while deleting the scrim. Please check the ID.');
    }
  };

  return (
    <div className="admin-scrim">
      <h1 className="admin-scrim__title">Admin Scrim Management</h1>

      {/* Action Selector */}
      <div className="admin-scrim__action-selector">
        <label htmlFor="action">Select Action:</label>
        <select id="action" value={action} onChange={handleActionChange}>
          <option value="">-- Select --</option>
          <option value="add">Add Scrim</option>
          <option value="edit">Edit Scrim</option>
          <option value="delete">Delete Scrim</option>
        </select>
      </div>

      {/* ID Input for Edit/Delete */}
      {(action === 'edit' || action === 'delete') && (
        <div className="admin-scrim__form-group">
          <label>Scrim ID</label>
          <input
            type="text"
            value={editId}
            onChange={handleEditIdChange}
            placeholder="Enter Scrim ID"
          />
          {action === 'edit' && (
            <button type="button" onClick={fetchScrimDetails}>
              Fetch Details
            </button>
          )}
          {action === 'delete' && (
            <button type="button" onClick={handleDelete}>
              Delete Scrim
            </button>
          )}
        </div>
      )}

      {/* Form for Add/Edit */}
      {(action === 'add' || action === 'edit') && (
        <form onSubmit={handleSubmit}>
          <div className="admin-scrim__form-group">
            <label>Scrim Name</label>
            <input
              type="text"
              name="scrim_name"
              value={scrimData.scrim_name}
              onChange={handleChange}
            />
          </div>
          <div className="admin-scrim__form-group">
            <label>Total Slots</label>
            <input
              type="number"
              name="total_slots"
              value={scrimData.total_slots}
              onChange={handleChange}
            />
          </div>
          <div className="admin-scrim__form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={scrimData.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="admin-scrim__form-group">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={scrimData.end_date}
              onChange={handleChange}
            />
          </div>
          <div className="admin-scrim__form-group">
            <label>Map</label>
            <div className="radio-group">
              {['Erangel', 'Miramar', 'Sanhok', 'Vikendi'].map((map) => (
                <label key={map}>
                  <input
                    type="radio"
                    name="map"
                    value={map}
                    checked={scrimData.map === map}
                    onChange={handleChange}
                  />
                  {map}
                </label>
              ))}
            </div>
          </div>
          <div className="admin-scrim__form-group">
            <label>Game Mode</label>
            <div className="radio-group">
              {['Solo', 'Duo', 'Squad'].map((mode) => (
                <label key={mode}>
                  <input
                    type="radio"
                    name="game_mode"
                    value={mode}
                    checked={scrimData.game_mode === mode}
                    onChange={handleChange}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>
          <div className="admin-scrim__form-group">
            <label>Room ID</label>
            <input
              type="text"
              name="room_id"
              value={scrimData.room_id}
              onChange={handleChange}
            />
          </div>
          <div className="admin-scrim__form-group">
            <label>Room Password</label>
            <input
              type="text"
              name="room_password"
              value={scrimData.room_password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">
            {action === 'edit' ? 'Update Scrim' : 'Add Scrim'}
          </button>
        </form>
      )}

      {error && <p className="admin-scrim__error">{error}</p>}
    </div>
  );
};

export default AdminScrim;
