import React, { useState } from 'react';
import './JoinTeam.css';
import { joinTeam } from '../../api/api';

const JoinTeam = (props) => {
  const [teamCode, setTeamCode] = useState('');
  const [In_Bgmiusername, setIn_Bgmiusername] = useState('');
  const [message, setMessage] = useState('');
  const [isJoined, setIsJoined] = useState(false); // Success state

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await joinTeam({ team_id: teamCode, bgmi_id: user.id ,in_bgmi_username:In_Bgmiusername });
      setMessage(response.message); // Show success message
      setIsJoined(true); // Set success state
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to join the team. Please try again.');
      setIsJoined(false);
    }
  };

  return (
    <div className="joinTeam-container">
      <div className="joinTeam-content">
        <span onClick={props.closeJoinTeam} className="close-btn">&times;</span>
        {isJoined ? (
          <div className="success-message">
            {/* Green Tick Using Unicode */}
            <div className="green-tick">&#10004;</div>
            <p>{message || 'You have successfully joined the team!'}</p>
          </div>
        ) : (
          <>
            <div className="jointeam-title">
              <h3>Join a Team</h3>
            </div>
            <div className="jointeam-section">
              {message && <p className="message">{message}</p>}
              <form onSubmit={handleJoinTeam}>
                <div className="input-group">
                  <label>Team Code:</label>
                  <input 
                    type="text" 
                    placeholder="Enter team code" 
                    value={teamCode} 
                    onChange={(e) => setTeamCode(e.target.value)} 
                    required 
                  />
                </div>
                <div className="input-group">
                  <label>Enter Your Ingame Name In BGMI</label>
                  <input 
                    type="text" 
                    placeholder="Enter Your Ingame Name In BGMI" 
                    value={In_Bgmiusername} 
                    onChange={(e) => setIn_Bgmiusername(e.target.value)} 
                    required 
                  />
                </div>
                <div className="jointeam-btn-container">
                  <button type="submit" className="joinTeam-btn">Join Team</button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JoinTeam;
