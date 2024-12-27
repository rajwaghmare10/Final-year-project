import React, { useState } from 'react';
import { getTeamsByTournamentId, addCoinsToTeamLeader } from '../../api/api';
import './AdminTeam.css';

const AdminTeam = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [leaderId, setLeaderId] = useState('');
  const [coins, setCoins] = useState('');
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Reset form and state
  const resetForm = () => {
    setError('');
    setSuccessMessage('');
    setTournamentId('');
    setTeamId('');
    setLeaderId('');
    setCoins('');
    setTeams([]);
  };

  // Handle option selection
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    resetForm();
  };

  // Fetch teams for a specific tournament
  const fetchTeams = async () => {
    if (!tournamentId.trim()) {
      setError('Please enter a valid Tournament ID.');
      return;
    }
    try {
      const response = await getTeamsByTournamentId(tournamentId);
      if (response.teams.length === 0) {
        setError('No teams found for this tournament.');
        setTeams([]);
      } else {
        setTeams(response.teams);
        setError('');
      }
    } catch (err) {
      setError('Failed to fetch teams. Please check the Tournament ID.');
    }
  };

  // Add coins to a team's leader and members
  const addCoins = async () => {
    const payload = {
      leader_id: leaderId.trim(),
      team_id: teamId.trim(),
      coins: Number(coins), // Ensure coins is sent as a number
    };
  
    console.log('Payload:', payload); // Debugging log
  
    try {
      const response = await addCoinsToTeamLeader(payload);
      setSuccessMessage(response.message || 'Coins added successfully.');
      setError('');
    } catch (err) {
      console.error('Error in addCoins:', err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };
  



  return (
    <div className="admin-team-container">
      <h1>Admin Team Management</h1>

      {/* Dropdown Menu */}
      <div className="admin-dropdown-group">
        <label htmlFor="adminOptions">Choose Action:</label>
        <select id="adminOptions" value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="fetchTeams">Fetch Teams</option>
          <option value="addCoins">Add Coins</option>
        </select>
      </div>

      {/* Fetch Teams Section */}
      {selectedOption === 'fetchTeams' && (
        <div className="admin-fetch-teams">
          <div className="admin-input-group">
            <label htmlFor="tournamentId">Tournament ID:</label>
            <input
              type="text"
              id="tournamentId"
              value={tournamentId}
              onChange={(e) => setTournamentId(e.target.value)}
              placeholder="Enter Tournament ID"
            />
            <button onClick={fetchTeams}>Fetch Teams</button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {teams.length > 0 && (
            <table className="admin-team-table">
              <thead>
                <tr>
                  <th>Team ID</th>
                  <th>Team Name</th>
                  <th>Total Members</th>
                  <th>Leader ID</th> {/* New column added */}
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.team_id}>
                    <td>{team.team_id}</td>
                    <td>{team.team_name}</td>
                    <td>{team.total_members}</td>
                    <td>{team.leader_id}</td> {/* Display Leader ID */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      )}

      {/* Add Coins Section */}
      {selectedOption === 'addCoins' && (
        <div className="admin-add-coins">
          <div className="admin-input-group">
            <label htmlFor="teamId">Team ID:</label>
            <input
              type="text"
              id="teamId"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              placeholder="Enter Team ID"
            />
          </div>
          <div className="admin-input-group">
            <label htmlFor="leaderId">Leader ID:</label>
            <input
              type="number"
              id="leaderId"
              value={leaderId}
              onChange={(e) => setLeaderId(e.target.value)}
              placeholder="Enter Leader ID"
            />
          </div>
          <div className="admin-input-group">
            <label htmlFor="coins">Coins:</label>
            <input
              type="number"
              id="coins"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              placeholder="Enter Coins"
            />
          </div>
          <button onClick={addCoins}>Add Coins</button>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
