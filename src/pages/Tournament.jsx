import React, { useContext, useState, useEffect } from 'react';
import { togglecontext } from '../context/context';
import './Torunament.css';
import ScrimTour from '../components/ScrimTour';
import { getAllTournaments } from '../api/api';

const Tournament = () => {
  const isOpen = useContext(togglecontext);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [delayed, setDelayed] = useState(true); 

  useEffect(() => {
  
    const delay = setTimeout(() => {
      setDelayed(false); 
      const fetchTournaments = async () => {
        try {
          const response = await getAllTournaments();
          setTournaments(response.tournaments);
        } catch (error) {
          console.error('Error fetching tournaments:', error);
        } finally {
          setLoading(false); 
        }
      };

      fetchTournaments();
    }, 600); 

    return () => clearTimeout(delay); 
  }, []);

  if (delayed) {
    return (
      <div className={`loading-spinner ${isOpen ? 'sidebar-open' : ''}`}>
        <i className="fa fa-spinner fa-spin"></i>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`tournament-content ${isOpen ? 'sidebar-open' : ''}`}>
      <h2>ALL TOURNAMENTS</h2>
      <div className="all-tournament">
        {loading ? (
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin"></i>
            <p>Loading tournaments...</p>
          </div>
        ) : (
          tournaments.map((tournament, index) => (
            <ScrimTour key={index} type="tournament" data={tournament} />
          ))
        )}
      </div>
    </div>
  );
};

export default Tournament;
