import React from 'react';
import './Scrim_tour.css';
import { NavLink } from 'react-router-dom';

const ScrimTour = ({ type, data }) => {
  if (!data) return null;

  const { tournament_id,scrim_id,banner, match_timing, tournament_name, scrim_name, game_mode, map, filled_slots, total_slots } = data;
  const bannerUrl = banner || '/images/scrim-banner.jpg'; 

  return (
    <div className="scrim-section">
      <div className="scrim-banner">
        <img src={bannerUrl} alt={`${type}-banner`} />
        <p className="time">{match_timing
          ? new Date(match_timing).toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          : 'No timing available'}</p>
      </div>
      <div className="scrim-info">
        <div className='scrim-name-slots'>
          <span>{type === 'scrim' ? scrim_name : tournament_name}</span>
          <span>
            <i className="fa fa-users" style={{ marginRight: '5px' }}></i>
            {filled_slots||'0'}/{total_slots}
          </span>
        </div>
        <ul>
          <li>{game_mode}</li>
          <li>{map}</li>
        </ul>
        <NavLink to={`/${type}/${type ==='tournament'? tournament_id : scrim_id}`}>
          <button className="join-bt">JOIN</button>
        </NavLink>
      </div>
    </div>
  );
};


export default ScrimTour;
