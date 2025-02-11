import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Navbar from '../components/navbarSidebar_comp/Navbar';
import Home from './Home';
import Tournament from './Tournament';
import TournamentDetail from './TournamentDetail';
import { togglecontext } from '../context/context';
import HowToJoin from './HowToJoin';
import Scrim from './Scrim';
import RedeemReward from './RedeemReward';
import Setting from './Setting';
import LoginPage from './loginAndRegister/LoginPage';
import Register from './loginAndRegister/Register';
import UpdatePassword from './loginAndRegister/updatePassword';
import Leaderboard from './Leaderboard';
import AdminNav from '../components/Admin-comps/AdminNav';
import Footer from '../components/navbarSidebar_comp/Footer';
import AdminHome from './Admin/AdminHome';
import AdminTournament from './Admin/AdminTournament';
import AdminTeam from './Admin/AdminTeam';
import AdminScrim from './Admin/AdminScrim';
import AdminUser from './Admin/AdminUser';

const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? element : <Navigate to={`/login?message=You need to log in to access other pages`} replace />
};

const AdminRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin" ? element : <Navigate to="/" replace />;
};


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
          <Footer />
        </togglecontext.Provider>
      ),
    },
    {
      path: '/tournament',
      element: (
        <ProtectedRoute element={
          <togglecontext.Provider value={isSidebarOpen}>
            <Navbar toggleSidebar={toggleSidebar} />
            <Tournament />
            <Footer />
          </togglecontext.Provider>
        } />
      ),
    },
    {
      path: '/scrims',
      element: (
        <ProtectedRoute element={
          <togglecontext.Provider value={isSidebarOpen}>
            <Navbar toggleSidebar={toggleSidebar} />
            <Scrim />
            <Footer />
          </togglecontext.Provider>
        } />
      ),
    },
    {
      path: '/redeemReward',
      element: (
        <ProtectedRoute element={
          <togglecontext.Provider value={isSidebarOpen}>
            <Navbar toggleSidebar={toggleSidebar} />
            <RedeemReward />
            <Footer />
          </togglecontext.Provider>
        } />
      ),
    },
    {
      path: '/leaderboard',
      element: (
        <ProtectedRoute element={
          <togglecontext.Provider value={isSidebarOpen}>
            <Navbar toggleSidebar={toggleSidebar} />
            <Leaderboard />
            <Footer />
          </togglecontext.Provider>
        } />
      ),
    },
    {
      path: '/howtojoin',
      element: (
        <ProtectedRoute element={
          <togglecontext.Provider value={isSidebarOpen}>
            <Navbar toggleSidebar={toggleSidebar} />
            <HowToJoin />
            <Footer />
          </togglecontext.Provider>
        } />
      ),
    },
    {
      path: '/settings',
      element: (
        <ProtectedRoute element={
          <togglecontext.Provider value={isSidebarOpen}>
            <Navbar toggleSidebar={toggleSidebar} />
            <Setting />
            <Footer />
          </togglecontext.Provider>
        } />
      ),
    },
    {
      path: '/:type/:id',
      element: (
        <ProtectedRoute element={
          <togglecontext.Provider value={isSidebarOpen}>
            <Navbar toggleSidebar={toggleSidebar} />
            <TournamentDetail />
            <Footer />
          </togglecontext.Provider>
        } />
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
      path: '/updatepassword',
      element: <UpdatePassword />,
    },
    {
      path: '/admin',
      element: (
        <AdminRoute element={
          <div>
            <AdminNav />
            <AdminHome />
          </div>
        } />
      ),
    },
    {
      path: '/admin/tournamentManagement',
      element: (
        <AdminRoute element={
          <div>
            <AdminNav />
            <AdminTournament />
          </div>
        } />
      ),
    },
    {
      path: '/admin/teams',
      element: (
        <AdminRoute element={
          <div>
            <AdminNav />
            <AdminTeam />
          </div>
        } />
      ),
    },
    {
      path: '/admin/user',
      element: (
        <AdminRoute element={
          <div>
            <AdminNav />
            <AdminUser />
          </div>
        } />
      ),
    },
    {
      path: '/admin/scrims',
      element: (
        <AdminRoute element={
          <div>
            <AdminNav />
            <AdminScrim />
          </div>
        } />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Main;
