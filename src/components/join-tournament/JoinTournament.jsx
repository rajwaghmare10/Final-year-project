import React, { useState } from 'react';
import './jointournament.css';
import JoinTeam from './JoinTeam';
import CreateTeam from './CreateTeam';

const JoinTournament = ({ closeJoinTour , id , type ,gameMode}) => {
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const handleJoinTeamToggle = () => {
    setShowJoinTeam((prev) => !prev);
  };

  const handleCreateTeamToggle = () => {
    setShowCreateTeam((prev) => !prev);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* Close Button */}
        <span onClick={closeJoinTour} className="jt-close-btn">
          &times;
        </span>

        {/* Buttons to Open Modals */}
        <button className="create-team" onClick={handleCreateTeamToggle}>
          Create Team
        </button>
        <button className="join-team" onClick={handleJoinTeamToggle}>
          Join Team
        </button>

        {/* Render Modals Conditionally */}
        {showCreateTeam  && <CreateTeam closeCreateTeam={handleCreateTeamToggle} id ={id} type ={type} gameMode ={gameMode}/>}
        {showJoinTeam   && <JoinTeam closeJoinTeam={handleJoinTeamToggle}  id ={id} type ={type} gameMode ={gameMode}/>}
      </div>
    </div>
  );
};

export default JoinTournament;
