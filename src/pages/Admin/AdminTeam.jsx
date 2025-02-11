import React, { useState } from 'react';
import { getTeamsByTournamentId, addCoinsToTeamLeader } from '../../api/api';
import './AdminTeam.css';

const AdminTeam = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [tournamentOrScrimId, setTournamentOrScrimId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [leaderId, setLeaderId] = useState('');
  const [coins, setCoins] = useState('');
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [type, setType] = useState('tournament'); // Default to 'tournament'

  // Reset form and state
  const resetForm = () => {
    setError('');
    setTournamentOrScrimId('');
    setTeamId('');
    setLeaderId('');
    setCoins('');
    setTeams([]);
    setType('tournament');
  };

  // Handle option selection
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    resetForm();
  };

  // Fetch teams for a specific tournament/scrim
  const fetchTeams = async () => {
    if (!tournamentOrScrimId.trim()) {
      setError('Please enter a valid Tournament/Scrim ID.');
      return;
    }

    try {
      const response = await getTeamsByTournamentId(tournamentOrScrimId, type); // Pass type
      if (response.teams.length === 0) {
        setError(`No teams found for this ${type}.`);
        setTeams([]);
      } else {
        setTeams(response.teams);
        setError('');
      }
    } catch (err) {
      resetForm();
      setError(`Failed to fetch teams. Please check the ${type} ID.`);
    }
  };

  // Add coins to a team's leader and members
  const addCoins = async () => {
    const payload = {
      leader_id: leaderId.trim(),
      team_id: teamId.trim(),
      coins: Number(coins),
    };

    try {
      const response = await addCoinsToTeamLeader(payload);
      if (response) {
        alert('Coins added successfully');
        resetForm();
      } else {
        setError('Failed to add coins');
      }
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
            <label htmlFor="tournamentOrScrimId">Tournament/Scrim ID:</label>
            <input
              type="text"
              id="tournamentOrScrimId"
              value={tournamentOrScrimId}
              onChange={(e) => setTournamentOrScrimId(e.target.value)}
              placeholder="Enter Tournament/Scrim ID"
            />
          </div>

          {/* Radio buttons to select Tournament or Scrim */}
          <div className="admin-radio-group">
            <label>
              <input
                type="radio"
                value="tournament"
                checked={type === 'tournament'}
                onChange={(e) => setType(e.target.value)}
              />
              Tournament
            </label>
            <label>
              <input
                type="radio"
                value="scrim"
                checked={type === 'scrim'}
                onChange={(e) => setType(e.target.value)}
              />
              Scrim
            </label>
          </div>

          <button onClick={fetchTeams}>Fetch Teams</button>
          {error && <p className="error-message">{error}</p>}
          {teams.length > 0 && (
            <table className="admin-team-table">
              <thead>
                <tr>
                  <th>Team ID</th>
                  <th>Team Name</th>
                  <th>Total Members</th>
                  <th>Leader ID</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.team_id}>
                    <td>{team.team_id}</td>
                    <td>{team.team_name}</td>
                    <td>{team.total_members}</td>
                    <td>{team.leader_id}</td>
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
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
