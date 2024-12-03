import React from 'react';
import './JoinTeam.css';

const JoinTeam = (props) => {
  return (
    <div className="joinTeam-container">
      <div className="joinTeam-content">
        <span onClick={props.closeJoinTeam} className="close-btn">&times;</span>
        <div className="jointeam-title">
          <h3>Join a Team</h3>
        </div>
        <div className="jointeam-section">
          <form>
            <div className="input-group">
              <label>Team Code :</label>
              <input type="text" placeholder="Enter team code" required />
            </div>
            <div className="jointeam-btn-container">
              <button type="submit" className="joinTeam-btn">Join Team</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
