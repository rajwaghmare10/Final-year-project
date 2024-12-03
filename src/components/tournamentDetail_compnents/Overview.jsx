import React from 'react';
import './overview.css';

const Overview = () => {
  return (
    <div className="overview-container">
      <p>
        DEATHMATE ESPORTS COMPETITIVE SCRIMS<br />
        PRIZEPOOL : 600 XO POINTS<br />
        ADVANCE ROOMS - 3X LOOT<br /><br />
        • IDP - 8:03 PM | START - 8:11 PM<br />
        • ALL 4 PLAYERS MUST BE REGISTERED & CHECKED-IN<br />
      </p>
      <div className="format-section">
        <p className="format-title">FORMAT</p>
        <div className="format-cards">
          <div className="card">
            <p className="card-title"><i className="fas fa-calendar-alt"></i> Check-in time</p>
            <p className="card-detail">15 min before start</p>
          </div>
          <div className="card">
            <p className="card-title"><i className="fas fa-users"></i> Team Size</p>
            <p className="card-detail">Squad</p>
          </div>
          <div className="card">
            <p className="card-title"><i className="fas fa-trophy"></i> Prizepool</p>
            <p className="card-detail">200k 🏅</p>
          </div>
          <div className="card">
            <p className="card-title"><i className="fas fa-users-cog"></i> Slots</p>
            <p className="card-detail">20 Teams</p>
          </div>
          <div className="card">
            <p className="card-title"><i className="fas fa-users-cog"></i>Registered</p>
            <p className="card-detail">0 / 20</p>
          </div>
        </div>
      </div>
      <div className="prize-distribution">
        <p className="prize-title">PRIZE DISTRIBUTION</p>
        <div className="prize-table">
          <div className="prize-row">
            <span className="prize-position"><i className="fas fa-trophy"></i> 1st</span>
            <span className="prize-amount">80000 🏅</span>
          </div>
          <div className="prize-row">
            <span className="prize-position"><i className="fas fa-trophy"></i> 2nd</span>
            <span className="prize-amount">50000 🏅</span>
          </div>
          <div className="prize-row">
            <span className="prize-position"><i className="fas fa-trophy"></i> 3rd</span>
            <span className="prize-amount">30000 🏅</span>
          </div>
          <div className="prize-row">
            <span className="prize-position"><i className="fas fa-trophy"></i> 4th</span>
            <span className="prize-amount">15000 🏅</span>
          </div>
          <div className="prize-row">
            <span className="prize-position"><i className="fas fa-trophy"></i> 5th</span>
            <span className="prize-amount">8000 🏅</span>
          </div>
          <div className="prize-row">
            <span className="prize-position"><i className="fas fa-trophy"></i> 6th</span>
            <span className="prize-amount">5000 🏅</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
