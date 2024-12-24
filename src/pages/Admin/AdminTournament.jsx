import React, { useState } from 'react';
import {
  addTournament,
  editTournament,
  getTournamentById,
  deleteTournament,
} from '../../api/api'; // Import necessary API functions
import './AdminTournament.css'; // Scoped CSS file

const AdminTournament = () => {
  const [tournamentData, setTournamentData] = useState({
    tournament_name: '',
    total_slots: '',
    prizepool: '',
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
    setTournamentData({
      tournament_name: '',
      total_slots: '',
      prizepool: '',
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

  // Fetch tournament details for editing
  const fetchTournamentDetails = async () => {
    try {
      const response = await getTournamentById(editId);
      const tournament = response.tournament;

      // Format dates to YYYY-MM-DD
      const formattedStartDate = tournament.start_date.split('T')[0];
      const formattedEndDate = tournament.end_date.split('T')[0];

      setTournamentData({
        ...tournament,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch tournament data. Please check the ID.');
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
    setTournamentData((prevData) => ({ ...prevData, [name]: value }));
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
        ...tournamentData,
        room_id: tournamentData.room_id || null,
        room_password: tournamentData.room_password || null,
      };

      if (action === 'edit') {
        await editTournament(editId, dataToSubmit);
        alert('Tournament updated successfully!');
      } else if (action === 'add') {
        await addTournament(dataToSubmit);
        alert('Tournament added successfully!');
      }
      resetForm();
    } catch (err) {
      setError('Error while submitting the tournament.');
    }
  };

  // Handle tournament deletion
  const handleDelete = async () => {
    try {
      await deleteTournament(editId);
      alert('Tournament deleted successfully!');
      resetForm();
    } catch (err) {
      setError('Error while deleting the tournament. Please check the ID.');
    }
  };

  return (
    <div className="admin-tournament">
      <h1 className="admin-tournament__title">Admin Tournament Management</h1>

      {/* Action Selector */}
      <div className="admin-tournament__action-selector">
        <label htmlFor="action">Select Action:</label>
        <select id="action" value={action} onChange={handleActionChange}>
          <option value="">-- Select --</option>
          <option value="add">Add Tournament</option>
          <option value="edit">Edit Tournament</option>
          <option value="delete">Delete Tournament</option>
        </select>
      </div>

      {/* ID Input for Edit/Delete */}
      {(action === 'edit' || action === 'delete') && (
        <div className="admin-tournament__form-group">
          <label>Tournament ID</label>
          <input
            type="text"
            value={editId}
            onChange={handleEditIdChange}
            placeholder="Enter Tournament ID"
          />
          {action === 'edit' && (
            <button type="button" onClick={fetchTournamentDetails}>
              Fetch Details
            </button>
          )}
          {action === 'delete' && (
            <button type="button" onClick={handleDelete}>
              Delete Tournament
            </button>
          )}
        </div>
      )}

      {/* Form for Add/Edit */}
      {(action === 'add' || action === 'edit') && (
        <form onSubmit={handleSubmit}>
          <div className="admin-tournament__form-group">
            <label>Tournament Name</label>
            <input
              type="text"
              name="tournament_name"
              value={tournamentData.tournament_name}
              onChange={handleChange}
            />
          </div>
          <div className="admin-tournament__form-group">
            <label>Total Slots</label>
            <input
              type="number"
              name="total_slots"
              value={tournamentData.total_slots}
              onChange={handleChange}
            />
          </div>
          <div className="admin-tournament__form-group">
            <label>Prize Pool</label>
            <input
              type="text"
              name="prizepool"
              value={tournamentData.prizepool}
              onChange={handleChange}
            />
          </div>
          <div className="admin-tournament__form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={tournamentData.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="admin-tournament__form-group">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={tournamentData.end_date}
              onChange={handleChange}
            />
          </div>
          <div className="admin-tournament__form-group">
            <label>Map</label>
            <div className="radio-group">
              {['Erangel', 'Miramar', 'Sanhok', 'Vikendi'].map((map) => (
                <label key={map}>
                  <input
                    type="radio"
                    name="map"
                    value={map}
                    checked={tournamentData.map === map}
                    onChange={handleChange}
                  />
                  {map}
                </label>
              ))}
            </div>
          </div>
          <div className="admin-tournament__form-group">
            <label>Game Mode</label>
            <div className="radio-group">
              {['Solo', 'Duo', 'Squad'].map((mode) => (
                <label key={mode}>
                  <input
                    type="radio"
                    name="game_mode"
                    value={mode}
                    checked={tournamentData.game_mode === mode}
                    onChange={handleChange}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>
          <div className="admin-tournament__form-group">
            <label>Room ID</label>
            <input
              type="text"
              name="room_id"
              value={tournamentData.room_id}
              onChange={handleChange}
            />
          </div>
          <div className="admin-tournament__form-group">
            <label>Room Password</label>
            <input
              type="text"
              name="room_password"
              value={tournamentData.room_password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">
            {action === 'edit' ? 'Update Tournament' : 'Add Tournament'}
          </button>
        </form>
      )}

      {error && <p className="admin-tournament__error">{error}</p>}
    </div>
  );
};

export default AdminTournament;
