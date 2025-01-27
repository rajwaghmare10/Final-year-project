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
import Setting from './Setting';
import LoginPage from './loginAndRegister/LoginPage';
import Register from './loginAndRegister/Register';
import Leaderboard from './Leaderboard';
import AdminNav from '../components/Admin-comps/AdminNav';
import Footer from '../components/navbarSidebar_comp/Footer';
import AdminHome from './Admin/AdminHome';
import AdminTournament from './Admin/AdminTournament';
import AdminTeam from './Admin/AdminTeam';
import AdminScrim from './Admin/AdminScrim';
import AdminUser from './Admin/AdminUser';

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
          <Footer/>
        </togglecontext.Provider>
      ),
    },
    {
      path: '/tournament',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Tournament />
          <Footer/>
        </togglecontext.Provider>
      ),
    },
    {
      path: '/scrims',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Scrim />
          <Footer/>
        </togglecontext.Provider>
      ),
    },
    {
      path: '/leaderboard',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Leaderboard />
          <Footer/>
        </togglecontext.Provider>
      ),
    },
    {
      path: '/howtojoin',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <HowToJoin />
          <Footer/>
        </togglecontext.Provider>
      ),
    },
    {
      path: '/settings',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <Setting />
          <Footer/>
        </togglecontext.Provider>
      ),
    },
    {
      path: '/:type/:id',
      element: (
        <togglecontext.Provider value={isSidebarOpen}>
          <Navbar toggleSidebar={toggleSidebar} />
          <TournamentDetail />
          <Footer/>
        </togglecontext.Provider>
      ),
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/admin',
      element: (
        <div>
          <AdminNav /> {/* Admin navbar only */}
          <AdminHome />
        </div>
      ),
    },
    {
      path: '/admin/tournamentManagement',
      element: (
        <div>
          <AdminNav /> {/* Admin navbar only */}
          <AdminTournament />
        </div>
      ),
    },
    {
      path: '/admin/teams',
      element: (
        <div>
          <AdminNav /> {/* Admin navbar only */}
          <AdminTeam />
        </div>
      ),
    },
    {
      path: '/admin/user',
      element: (
        <div>
          <AdminNav /> {/* Admin navbar only */}
          <AdminUser />
        </div>
      ),
    },
    {
      path: '/admin/scrims',
      element: (
        <div>
          <AdminNav /> {/* Admin navbar only */}
          <AdminScrim />
        </div>
      ),
    },
    
  ]);

  return <RouterProvider router={router} />;
};

export default Main;
