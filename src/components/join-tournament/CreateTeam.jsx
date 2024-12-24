import React, { useState } from 'react';
import './Createteam.css';

const CreateTeam = ({ closeCreateTeam, onCreateTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [leaderID, setLeaderID] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to parent or backend API
    onCreateTeam({ teamName, leaderID });
  };

  return (
    <div className="createTeam-container">
      <div className="createTeam-content">
        <span onClick={closeCreateTeam} className="close-btn">&times;</span>
        <div className="createTeam-title">
          <h3>Create Your Team</h3>
        </div>
        <div className="createTeam-section">
          <form onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
};

export default CreateTeam;
