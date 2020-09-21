import React from "react";
import Home from '../components/Home';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import Profile from '../components/Profile';
import AdminDashboard from '../components/AdminDashboard';

const routes = {
  '/': () => <Home />,
  '/signup': () => <Signup />,
  '/signin': () => <Signin />,
  '/profile': () => <Profile />,
  '/admin-dashboard': () => <AdminDashboard />
};
export default routes;
