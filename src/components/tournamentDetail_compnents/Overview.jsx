import { useState } from 'react';
import React from 'react';
import './overview.css';

const Overview = ({ data }) => {
  const { tournament_name, scrim_name, prizepool, match_timing ,game_mode , entry_fee} = data;
  const [togglerule, settogglerule] = useState(false);

  const handleRule = () => {
    settogglerule(!togglerule);
  };

  const matchStartTime = new Date(match_timing).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const idpTime = new Date(new Date(match_timing).getTime() - 15 * 60000).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <div className="overview-container">
      <p>
        {tournament_name || scrim_name}<br />
        PRIZEPOOL : {prizepool} XE POINTS<br />
        ENTRY FEES : {entry_fee|| 'FREE'} <br/>
        ADVANCE ROOMS - 3X LOOT<br /><br />
        • IDP - {idpTime} | START - {matchStartTime}<br />
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
            <p className="card-detail">{game_mode}</p>
          </div>
          <div className="card">
            <p className="card-title"><i className="fas fa-trophy"></i> Prizepool</p>
            <p className="card-detail">{prizepool} 🏅</p>
          </div>
          <div className="card">
            <p className="card-title"><i className="fas fa-users-cog"></i> Slots</p>
            <p className="card-detail">{data.total_slots} Teams</p>
          </div>
          <div className="card">
            <p className="card-title"><i className="fas fa-users-cog"></i>Registered</p>
            <p className="card-detail">{data.filled_slots || "0"} / 20</p>
          </div>
        </div>
      </div>
      <div className="prize-distribution">
        <p className="prize-title">PRIZE DISTRIBUTION</p>
        <div className="prize-table">
          {[0.5, 0.3, 0.2].map((percentage, index) => (
            <div className="prize-row" key={index}>
              <span className="prize-position">
                <i className="fas fa-trophy"></i> {index + 1}st
              </span>
              <span className="prize-amount">
                {Math.floor(prizepool * percentage)} 🏅
              </span>
            </div>
          ))}
        </div>

        <div className={`rule-section ${togglerule ? 'show-rules' : ''}`}>
          <button onClick={handleRule} className="rule-toggle">
            {togglerule ? 'Hide Rules' : 'Show Rules'}
          </button>
          {togglerule && (
            <div className='rules-content'>
              <ul>
                <li>ID LEVEL SHOULD BE 40+</li>
                <li>PRIZEPOOL DISTRIBUTION WILL BE DONE WITHIN 60 DAYS, SO DON'T SPAM ADMIN'S DM</li>
                <li>SOLO/DUO/EMULATORS/ALL MIC/TEAM UP/UNREGISTERED PLAYERS WILL RESULT IN DISQUALIFICATION</li>
                <li>ALL REGISTERED/PLAYING MEMBERS HAVE TO SUBSCRIBE TO PRO PASS</li>
                <li>ALL 4 PLAYERS MUST RECORD THEIR WHOLE GAMEPLAY WITH SOUND & BACKGROUND APPS (AT LEAST THRICE IN A MATCH) UNEDITED</li>
                <li>SCREENSHOTS OF RESULTS ARE COMPULSORY; WITHOUT THAT, NO PRIZE MONEY</li>
                <li>IF YOU WERE KILLED BY A HACKER, PROVIDE SUITABLE RECORDING & DEATH CAM (MANDATORY); VIDEO SHOULD BE CONVINCING ENOUGH</li>
                <li>ALL 4 PLAYERS MUST JOIN THE ROOM 5 MINUTES IN ADVANCE; WE WILL NOT BE RESPONSIBLE IF ANY PLAYER IS SITTING IN YOUR SLOT</li>
                <li>NO COMPLAINTS WILL BE ENTERTAINED FOR ANY PLAYERS SITTING IN YOUR SLOT POST START TIME</li>
                <li>IN ANY CASE OF DISPUTE, LAST DECISION IS UP TO THE ADMIN</li>
                <li>YOU MUST AGREE TO ALL TERMS AND CONDITIONS MENTIONED ABOVE BEFORE PLAYING</li>
                <li>TEAMS ARE NOT ALLOWED TO CHANGE THEIR IN-GAME NAME</li>
                <li>TEAMS WITH UNREGISTERED PLAYERS WILL BE DISQUALIFIED. NAME CHANGE IS NOT POSSIBLE AFTER REGISTRATION</li>
                <li>EMERGENCY PICKUP/BACKPACK ARE DISALLOWED. TEAMS USING THIS FEATURE WILL GET DISQUALIFIED DIRECTLY</li>
              </ul>
            </div>

          )}
        </div>

      </div>
    </div>
  );
};

export default Overview;
