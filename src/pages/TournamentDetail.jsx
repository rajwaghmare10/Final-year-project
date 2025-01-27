  import React, { useState, useContext, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import { togglecontext } from '../context/context';
  import './tournamentdetail.css';
  import Overview from '../components/tournamentDetail_compnents/Overview';
  import Credentials from '../components/tournamentDetail_compnents/Credentials';
  import Result from '../components/tournamentDetail_compnents/Result';
  import JoinTournament from '../components/join-tournament/JoinTournament';
  import { getScrimById, getTournamentById } from '../api/api';

  const TournamentDetail = () => {
    const isOpen = useContext(togglecontext);
    const [activeContent, setActiveContent] = useState('overview');
    const [joinTour, setjoinTour] = useState(false);
    const { type, id } = useParams();
    const [scrimOrTournamentdetails, setscrimOrTournamentdetails] = useState('');

    useEffect(() => {
      const fetchScrimOrTournamentDetails = async () => {
        try {
          if (type === 'scrim') {
            const response = await getScrimById(id);
            setscrimOrTournamentdetails(response.scrim);
            
          } else if (type === 'tournament') {
            const response = await getTournamentById(id);
            setscrimOrTournamentdetails(response.tournament);
          }
        } catch (error) {
          console.error(error)
        }
      }
      fetchScrimOrTournamentDetails();
    }, [id , type]);


    const handleContentChange = (content) => {
      setActiveContent(content);
    };

    const toggleJoinTournament = () => {
      setjoinTour(!joinTour)
    }

    return (
      <div className={`detail-content ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className='tournament-banner'>
          <img src={scrimOrTournamentdetails.banner} alt='Banner'/>
          <button className='join-btn' onClick={toggleJoinTournament}>Join Tournament</button>
        </div>
        {joinTour && <JoinTournament closeJoinTour={toggleJoinTournament} id = {id} type ={type} gameMode = {scrimOrTournamentdetails.game_mode}/>}
        <div className='tournament-info'>
          <p className='organizer-name'>
            {scrimOrTournamentdetails.tournament_name || scrimOrTournamentdetails.scrim_name || 'Unknown Organizer'}
          </p>
          <div className='btn-info'>
            <button className='btn join' disabled>
              {scrimOrTournamentdetails.registration_open === 'open' ? 'OPEN' : 'CLOSED'}
            </button>
            <button className='btn squad' disabled>
              {scrimOrTournamentdetails.game_mode || 'UNKNOWN'}
            </button>
            <button className='btn slot' disabled>
              {scrimOrTournamentdetails.filled_slots || 0}/{scrimOrTournamentdetails.total_slots || 'N/A'}
            </button>
            <button className='btn map' disabled>
              {scrimOrTournamentdetails.map || 'UNKNOWN MAP'}
            </button>
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
          {activeContent === 'overview' && <Overview data={scrimOrTournamentdetails}/>}
          {activeContent === 'credentials' && <Credentials data={scrimOrTournamentdetails} />}
          {activeContent === 'result' && <Result />}
        </div>

        <div className="host-section">
          <span className='host-title'>Host</span>
          <span className="host-name">IQOO ESPORTS <i className="fas fa-check-circle verified"></i></span>
        </div>
      </div>
    );
  };

  export default TournamentDetail;
