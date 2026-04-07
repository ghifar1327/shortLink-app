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

export default function App() {
  return (
    <Router></Router>
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
        {path: "create-link",element: <CreateLink/>}
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
