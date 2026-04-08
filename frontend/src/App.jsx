import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import AuthLayout from './layouts/AuthLayout';
import Dashboard from './pages/Dashboard';
import CreateLink from './pages/CreateLink';
import { AuthProvider } from './context/AuthContex.jsx';
import { LinkProvider } from './context/LinkContex.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <AuthProvider>
      <LinkProvider>
       <Router></Router>
      </LinkProvider>
    </AuthProvider>
  )
}


function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout/>,
      children: [
        { index: true, element: <LandingPage/>},
        {path: "dashboard", element: <Dashboard/>},
        {path: "create-link",element: <CreateLink/>},
        {path: "profile", element: <Profile/>}
      ]
    },
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },    
  ]);

  return <RouterProvider router={router} />;
}
