import React, { useState, useEffect } from 'react';
import './Createteam.css';
import { createTeam, getTeamMembers, registerTeam } from '../../api/api';

const CreateTeam = ({ closeCreateTeam, id, type, gameMode }) => {
  const [teamName, setTeamName] = useState('');
  const [leaderID, setLeaderID] = useState('');
  const [teamID, setTeamID] = useState(localStorage.getItem('teamID') || null); // Retrieve from local storage
  const [teamMembers, setTeamMembers] = useState([]);
  const [showRegisterButton, setShowRegisterButton] = useState(!!localStorage.getItem('teamID')); // Show register button if teamID exists

  useEffect(() => {
    // Fetch team members if teamID exists in local storage
    if (teamID) {
      fetchTeamMembers(teamID);
    }
  }, [teamID]);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const teamDetail = { team_name: teamName, leader_id: leaderID, game_mode: gameMode, type };
    try {
      const response = await createTeam(teamDetail);
      const createdTeamID = response.team.team_id;

      setTeamID(createdTeamID); // Update state
      setShowRegisterButton(true); // Show register button

      // Save teamID to local storage
      localStorage.setItem('teamID', createdTeamID);

      fetchTeamMembers(createdTeamID); // Fetch team members
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team. Please try again.');
    }
  };

  const fetchTeamMembers = async (team_id) => {
    try {
      const response = await getTeamMembers(team_id);
      setTeamMembers(response.members || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const handleRegisterTeam = async () => {
    try {
      await registerTeam({ team_id: teamID, tournament_or_scrim_id: id, type });
      alert('Team registered successfully!');

      // Clear local storage and close modal
      localStorage.removeItem('teamID');
      closeCreateTeam();
    } catch (error) {
      console.error('Error registering team:', error);
      alert('Failed to register team. Please try again.');
    }
  };

  return (
    <div className="createTeam-container">
      <div className="createTeam-content">
        <span onClick={closeCreateTeam} className="close-btn">&times;</span>
        <div className="createTeam-title">
          <h3>Create Your Team</h3>
        </div>
        {!teamID ? (
          <div className="createTeam-section">
            <form onSubmit={handleCreateTeam}>
              <div className="input-group">
                <label>Team Name</label>
                <input
                  type="text"
                  placeholder="Enter Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Your Player ID</label>
                <input
                  type="text"
                  placeholder="Enter Your Player ID"
                  value={leaderID}
                  onChange={(e) => setLeaderID(e.target.value)}
                  required
                />
              </div>
              <div className="submit-btn-container">
                <button type="submit" className="createTeam-btn">Generate Team Code</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="team-details-section">
            <h4>Team Created Successfully!</h4>
            <p><strong>Team Code:</strong> {teamID}</p>
            <h5>Team Members</h5>
            <ul className="team-members-list">
              {teamMembers.length > 0 ? (
                teamMembers.map((member, index) => (
                  <li key={index}>{member.user_name || member.bgmi_id}</li>
                ))
              ) : (
                <p>No members have joined the team yet.</p>
              )}
            </ul>
            {showRegisterButton && (
              <div className="register-btn-container">
                <button onClick={handleRegisterTeam} className="register-btn">Register Team</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTeam;
