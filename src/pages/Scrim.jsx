import React, { useContext, useState, useEffect } from 'react';
import { togglecontext } from '../context/context';
import './Torunament.css';
import ScrimTour from '../components/ScrimTour';
import { getAllScrims } from '../api/api';

const Scrim = () => {
  const isOpen = useContext(togglecontext);
  const [scrims, setScrims] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for API fetch
  const [delayed, setDelayed] = useState(true); // Delay state for 2-second wait

  useEffect(() => {
    const delay = setTimeout(() => {
      setDelayed(false); 
      const fetchScrims = async () => {
        try {
          const response = await getAllScrims();
          setScrims(response.scrims);
        } catch (error) {
          console.error('Error fetching scrims:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchScrims();
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
      <h2>PRACTICE SCRIMS</h2>
      <div className="all-tournament">
        {loading ? (
          <div className="loading-spinner">
            <i className="fa fa-spinner fa-spin"></i>
            <p>Loading scrims...</p>
          </div>
        ) : (
          scrims.map((scrim, index) => (
            <ScrimTour key={index} type="scrim" data={scrim} />
          ))
        )}
      </div>
    </div>
  );
};

export default Scrim;
