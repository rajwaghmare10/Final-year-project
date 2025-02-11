import React, { useState, useContext, useEffect } from 'react';
import { togglecontext } from '../context/context';
import './Leaderboard.css';
import LeaderboardCard from '../components/leaderboard-comp/LeaderboardCard';
import { getLeaderboardData } from '../api/api';

const Leaderboard = () => {
  const isOpen = useContext(togglecontext);
  const [activeLeaderboard, setActiveLeaderboard] = useState('week');
  const [leaderboardData, setLeaderboardData] = useState([]);


  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboardData(activeLeaderboard);
        setLeaderboardData(response.leaderboard);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeaderboard();
  }, [activeLeaderboard]);

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
          className={`leaderboard-info ${activeLeaderboard === 'week' ? 'activeLB' : ''}`}
          onClick={() => handleLeaderboardSwitch('week')}
        >
          Weekly
        </button>
        <button
          className={`leaderboard-info ${activeLeaderboard === 'month' ? 'activeLB' : ''}`}
          onClick={() => handleLeaderboardSwitch('month')}
        >
          Monthly
        </button>
      </div>

      <div className='leaderboard-container'>
        {leaderboardData.slice(0, 3).map((leaderboard, index) => (
          <LeaderboardCard key={index} leaderboard={leaderboard} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
