import React, { useState } from 'react';
import { getTeamsByTournamentId } from '../../api/api'; // Updated API function
import './AdminTeam.css';

const AdminTeam = () => {
  const [tournamentId, setTournamentId] = useState('');
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  // Handle Tournament ID input change
  const handleTournamentIdChange = (e) => {
    setTournamentId(e.target.value);
  };

  // Fetch teams for the given Tournament ID
  const fetchTeams = async () => {
    if (!tournamentId) {
      setError('Please enter a valid Tournament ID.');
      return;
    }

    try {
      const response = await getTeamsByTournamentId(tournamentId); // API call to fetch teams
      if (response.teams.length === 0) {
        setError('No teams found for this tournament.');
        setTeams([]);  // Reset teams if none found
      } else {
        setTeams(response.teams);  // Set teams if found
        setError('');
      }
    } catch (err) {
      setError('Failed to fetch teams. Please check the Tournament ID.');
      setTeams([]);  // Reset teams in case of error
    }
  };

  return (
    <div className="admin-team-container">
      <h1>Admin Team Management</h1>

      {/* Tournament ID Input */}
      <div className="admin-input-group">
        <label htmlFor="tournamentId">Tournament ID:</label>
        <input
          type="text"
          id="tournamentId"
          value={tournamentId}
          onChange={handleTournamentIdChange}
          placeholder="Enter Tournament ID"
        />
        <button onClick={fetchTeams}>Fetch Teams</button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Teams Table */}
      {teams.length > 0 && (
        <table className="admin-team-table">
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Team Name</th>
              <th>Total Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.team_id}>
                <td>{team.team_id}</td>
                <td>{team.team_name}</td>
                <td>{team.total_members}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTeam;
