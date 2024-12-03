import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { togglecontext } from '../../context/context';

const Sidebar = () => {
  const isOpen = useContext(togglecontext);
  
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Sidebar Items */}
      <ul className="sidebar-items">
        <li><NavLink to="/"><i className="fas fa-home"></i> {isOpen && 'Home'}</NavLink></li>
        <li><NavLink to="/tournament"><i className="fas fa-trophy"></i> {isOpen && 'Tournament'}</NavLink></li>
        <li><NavLink to="/scrims"><i className="fas fa-gamepad"></i> {isOpen && 'Scrims'}</NavLink></li>
        <li><NavLink to="/leaderboard"><i className="fas fa-chart-line"></i> {isOpen && 'Leaderboard'}</NavLink></li>
        <li><NavLink to="/howtojoin"><i className="fas fa-question-circle"></i> {isOpen && 'How to Join'}</NavLink></li>
        <li><NavLink to="/settings"><i className="fas fa-cog"></i> {isOpen && 'Settings'}</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
