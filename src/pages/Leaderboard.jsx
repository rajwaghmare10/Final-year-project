import React, { useState, useContext } from 'react';
import { togglecontext } from '../context/context';
import './Leaderboard.css';
import LeaderboardCard from '../components/leaderboard-comp/LeaderboardCard';

const Leaderboard = () => {
  const isOpen = useContext(togglecontext);
  const [activeLeaderboard, setActiveLeaderboard] = useState('weekly');

  const handleLeaderboardSwitch = (type) => {
    setActiveLeaderboard(type);
  };

  return (
    <div className={`leaderboard-content ${isOpen ? 'sidebar-open' : ''}`}>
      <div className='leaderboard-title'>
        <h1>Leaderboard</h1>
      </div>
      
      <div className='lb-range'>
        <button 
          className={`leaderboard-info ${activeLeaderboard === 'weekly' ? 'activeLB' : ''}`}
          onClick={() => handleLeaderboardSwitch('weekly')}
        >
          Weekly
        </button>
        <button 
          className={`leaderboard-info ${activeLeaderboard === 'monthly' ? 'activeLB' : ''}`}
          onClick={() => handleLeaderboardSwitch('monthly')}
        >
          Monthly
        </button>
      </div>

      <div className='leaderboard-container'>
        {/* Display leaderboard based on the selected option */}
        {activeLeaderboard === 'weekly' ? (
          <>
            <LeaderboardCard/>
            <LeaderboardCard/>
            <LeaderboardCard/>
          </>
        ) : (
          <>
            <LeaderboardCard/>
            <LeaderboardCard/>
            <LeaderboardCard/>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
