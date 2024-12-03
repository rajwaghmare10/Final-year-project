import React from 'react'
import './Scrim_tour.css'
import { NavLink } from 'react-router-dom';

const ScrimTour = () => {
  return (
    <div className="scrim-section">
        <div className='scrim-banner'>
          <img src='/images/scrim-banner.jpg' alt='scrim-image' />
          <p className='time'>Dec 31,2025 , 12:00 PM</p>
          </div>
          <div className='scrim-info'>
            <p>BGMI SHOWOFF SCRIMS</p>
            <ul>
              <li>Squad</li>
              <li>TPP</li>
            </ul>
            <NavLink to='/tournament/tournamentdetail'><button className='join-bt'>JOIN</button></NavLink>
          </div>
        
    </div>
  )
}

export default ScrimTour