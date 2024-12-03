// Main.js
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from '../components/navbarSidebar_comp/Navbar';
import Home from './Home';
import Tournament from './Tournament';
import TournamentDetail from './TournamentDetail';
import { togglecontext } from '../context/context';
import HowToJoin from './HowToJoin';
import Scrim from './Scrim';
import LoginPage from './loginAndRegister/LoginPage';
import Register from './loginAndRegister/Register';
import Leaderboard from './Leaderboard';

const Main = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Home />
        </togglecontext.Provider>
      ),
    },
    {
      path: '/tournament',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Tournament />
        </togglecontext.Provider>
      ),
    },
    {
      path: '/scrims',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Scrim />
        </togglecontext.Provider>
      ),
    },
    {
      path: '/leaderboard',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Leaderboard />
        </togglecontext.Provider>
      ),
    },
    {
      path: '/howtojoin',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <HowToJoin />
        </togglecontext.Provider>
      ),
    },
    {
      path: '/tournament/tournamentdetail',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <TournamentDetail />
        </togglecontext.Provider>
      ),
    },
    {
      path: '/login',
      element: (  
          <LoginPage/>
      ),
    },
    {
      path: '/register',
      element: (  
          <Register />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Main;
