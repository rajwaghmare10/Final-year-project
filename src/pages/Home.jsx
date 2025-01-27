import React, { useContext, useState, useEffect } from 'react';
import { togglecontext } from '../context/context';
import './Home.css';
import ScrimTour from '../components/ScrimTour';
import { getAllTournaments, getAllScrims } from '../api/api';

const Home = () => {
  const isOpen = useContext(togglecontext);
  const [tournaments, settournaments] = useState([]);
  const [scrims, setscrims] = useState([]);

  useEffect(() => {
    const fetchTournamentsAndScrims = async () => {
      try {
        const [responseTournaments, responseScrims] = await Promise.all([
          getAllTournaments(),
          getAllScrims(),
        ]);
        settournaments(responseTournaments.tournaments || []);
        setscrims(responseScrims.scrims || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTournamentsAndScrims();
  }, []);

  return (
    <div className={`home-content ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="home-container">
        <button>
          <img src="/images/banner1.jpeg" alt="banner" />
        </button>
      </div>
      <div className="scrims-tournament-section">
        <p className="title">LIVE / UPCOMING SCRIMS</p>
        {scrims.slice(0, 3).map((scrim, index) => (
          <ScrimTour key={index} type="scrim" data={scrim} />
        ))}

        <p className="title">LIVE / UPCOMING TOURNAMENTS</p>
        {tournaments.slice(0, 3).map((tournament, index) => (
          <ScrimTour key={index} type="tournament" data={tournament} />
        ))}
      </div>
    </div>
  );
};

export default Home;
