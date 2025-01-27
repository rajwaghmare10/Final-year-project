import React, { useState } from 'react';
import axios from 'axios';
import { getTeamsByTournamentId } from '../../api/api';
import './AdminResult.css'

const AdminResult = () => {
    const [id, setId] = useState(''); 
    const [teams, setTeams] = useState([]); 
    const [results, setResults] = useState([]); 
    const [error, setError] = useState(null); 

    const fetchTeams = async () => {
        try {
            const response = await getTeamsByTournamentId(id);
            setTeams(response.teams || []);
            setResults(
                response.teams.map(team => ({
                    team_id: team.team_id,
                    kills: 0,
                    total_points: 0,
                    rank: null,
                }))
            );
            setError(null); 
        } catch (error) {
            console.error('Error fetching teams:', error);
            setError('Failed to fetch teams. Please check the tournament ID.');
        }
    };

   
    const handleResultChange = (teamId, field, value) => {
        setResults(prev =>
            prev.map(result =>
                result.team_id === teamId ? { ...result, [field]: value } : result
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/updateResult', { results });
            alert('Results updated successfully!');
            setError(null);
        } catch (error) {
            console.error('Error updating results:', error);
            setError('Failed to update results. Please try again.');
        }
    };

    return (
        <div className="admin-result">
            <div className="admin-result__form-group">
                <label>Tournament ID</label>
                <input
                    type="text"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    placeholder="Enter Tournament ID"
                />
                <button type="button" onClick={fetchTeams}>
                    Fetch Details
                </button>
            </div>

            {error && <p className="admin-result__error">{error}</p>}

            <h2 className="admin-result__title">Update Results</h2>
            <form onSubmit={handleSubmit}>
                <table className="admin-result__table">
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Kills</th>
                            <th>Total Points</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(team => (
                            <tr key={team.team_id}>
                                <td>{team.team_name}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        value={
                                            results.find(result => result.team_id === team.team_id)?.kills || 0
                                        }
                                        onChange={e =>
                                            handleResultChange(team.team_id, 'kills', parseInt(e.target.value))
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        value={
                                            results.find(result => result.team_id === team.team_id)?.total_points || 0
                                        }
                                        onChange={e =>
                                            handleResultChange(
                                                team.team_id,
                                                'total_points',
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            results.find(result => result.team_id === team.team_id)?.rank || ''
                                        }
                                        onChange={e =>
                                            handleResultChange(team.team_id, 'rank', parseInt(e.target.value))
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit" className="admin-result__submit">Submit Results</button>
            </form>
        </div>


    );
};

export default AdminResult;
