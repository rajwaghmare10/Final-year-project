import React, { useState, useContext } from 'react';
import { togglecontext } from '../context/context';
import './tournamentdetail.css';
import Overview from '../components/tournamentDetail_compnents/Overview';
import Credentials from '../components/tournamentDetail_compnents/Credentials';
import Result from '../components/tournamentDetail_compnents/Result';
import JoinTournament from '../components/join-tournament/JoinTournament';

const TournamentDetail = () => {
  const isOpen = useContext(togglecontext);
  const [activeContent, setActiveContent] = useState('overview');
  const [togglerule, settogglerule] = useState(false);
  const [joinTour, setjoinTour] = useState(false)

  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  const handleRule = () => {
    settogglerule(!togglerule);
  };

  const toggleJoinTournament = () => {
    setjoinTour(!joinTour)
  }

  return (
    <div className={`detail-content ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className='tournament-banner'>
        <button className='join-btn' onClick={toggleJoinTournament}>Join Tournament</button>
      </div>
      {joinTour && <JoinTournament closeJoinTour={toggleJoinTournament} />}
      <div className='tournament-info'>
        <p className='organizer-name'>Organizer Name</p>
        <div className='btn-info'>
          <button className='btn join' disabled>OPEN</button>
          <button className='btn squad' disabled>SQUAD</button>
          <button className='btn slot' disabled>0/18</button>
          <button className='btn map' disabled>ERANGEL</button>
        </div>

        <div className='info-btns'>
          <button
            className={`full-info ${activeContent === 'overview' ? 'active' : ''}`}
            onClick={() => handleContentChange('overview')}
          >
            Overview
          </button>
          <button
            className={`full-info ${activeContent === 'credentials' ? 'active' : ''}`}
            onClick={() => handleContentChange('credentials')}
          >
            Credentials
          </button>
          <button
            className={`full-info ${activeContent === 'result' ? 'active' : ''}`}
            onClick={() => handleContentChange('result')}
          >
            Result
          </button>
        </div>
      </div>

      <div className='content-display'>
        {activeContent === 'overview' && <Overview />}
        {activeContent === 'credentials' && <Credentials />}
        {activeContent === 'result' && <Result />}
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
      <div className="host-section">
        <span className='host-title'>Host</span>
        <span className="host-name">IQOO ESPORTS <i className="fas fa-check-circle verified"></i></span>
      </div>
    </div>
  );
};

export default TournamentDetail;
