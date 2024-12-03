import React from 'react';
import './Createteam.css';

const CreateTeam = ({ closeCreateTeam }) => {
  return (
    <div className="createTeam-container">
      <div className="createTeam-content">
        <span onClick={closeCreateTeam} className="close-btn">&times;</span>
        <div className="createTeam-title">
          <h3>Create Team</h3>
        </div>
        <div className="createTeam-section">
          <form>
            <div className="input-group">
              
              <input type="text" placeholder="Enter Team Name" required />
            </div>
            <div className="input-group">
              
              <input type="text" placeholder="Enter Your ID" required />
            </div>
            <div className="input-group">
             
              <input type="text" placeholder="Enter Player 2 ID" required />
            </div>
            <div className="input-group">
             
              <input type="text" placeholder="Enter Player 3 ID" required />
            </div>
            <div className="input-group">
              
              <input type="text" placeholder="Enter Player 4 ID" required />
            </div>
            <div className="input-group">
              
              <input type="text" placeholder="Enter Player 5 ID" />
            </div>
            <div className="submit-btn-container">
              <button className="createTeam-btn">Create Team</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
